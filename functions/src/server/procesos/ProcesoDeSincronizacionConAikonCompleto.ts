import { AikonApiObtenerTokenService } from '../servicios/AikonApiObtenerTokenService';
import { PrismaService } from '../servicios/PrismaService';
import { SyncMarca } from '../servicios/SyncMarca';
import { SyncArticuloPrecioService } from '../servicios/SyncArticuloPrecioService';
import { SyncReferencia01 } from '../servicios/SyncReferencia01';
import { SyncReferencia02 } from '../servicios/SyncReferencia02';
import { SyncFamilia } from '../servicios/SyncFamilia';
import { ProcesoInfoTipo } from '../entidades/ProcesoInfoTipo';
import { ProcesoInfo } from '../entidades/ProcesoInfo';
import { ProcesoInfoDetalle } from '../entidades/ProcesoInfoDetalle';

const tipoProceso = new ProcesoInfoTipo(1, 'ProcesoSincronizacionConAikonCompleto')
/* 
    == Esta función agrupa todas las sincronizaciones que deben hacerse ==
    Estos son los requerimientos principales:
    [ x ] Antes de ejecutar este preoceso en particular, es recomendable realizar un backup de las tablas que van a ser afectadas.
    [ x ] Almacenar información de comienzo de ejecución del proceso completo. (idProceso, FechaHoraInicio, Nombre del proceso, Estado de ejecución, Disparador(Sistema, UsuarioId))
    [ x ] Obtener el Token desde aquí.
    [ x ] Preparar toda la información a sincronizar: Marcas, Categorías, Rubros, Familias y ArtículosPrecios respectivamente.
    [ x ] Ejecutar todas las sincronizaciones en una transacción de Prisma (MySQL Transaction).
    [ x ] Almacenar información de la ejecución satisfactoria del proceso. (Tiempo de ejecución, Estado: Finalizado, Error: false, FechaHoraFin)
    [ x ] En caso de error. Almacenar error. Actualizar información de ejecución de proceso. (Estado: Finalizado, Error: true, FechaHoraFin). Crear una fila en MySQL o almacenar error en Firestore.
*/
export async function procesoDeSincronizacionConAikonCompleto() {
    try {
        // Info de inicio de ejecución del proceso. [TODO]
        const procesoInfo = new ProcesoInfo(-1, tipoProceso.id, new Date())
        await procesoInfo.iniciar()

        // Backup de la DB
        try {
            const procesoInfoDetalleBackupDb = new ProcesoInfoDetalle(-1, procesoInfo.id, 'BackupDatabase')
            await procesoInfoDetalleBackupDb.iniciar()
            const startTime = performance.now()
            await PrismaService.generateBackupForProcesoDeSincronizacionConAikonCompleto()
            const endTime = performance.now()
            const tiempoEjecucionMs = endTime - startTime
            procesoInfoDetalleBackupDb.estado_ejecucion = 'Finalizado'
            procesoInfoDetalleBackupDb.tiempo_ejecucion = tiempoEjecucionMs
            procesoInfoDetalleBackupDb.finalizar()
        } catch (e) {
            // capturar error
        }
        

        // Ejecución de los Sync
        await procesoDeSincronizacionConAikonCompletoTransaccion()
    } catch (e) {
        // Info de Error en el proceso.[TODO]
        console.error(e)
    } finally {
        // Info de fin de ejecución del proceso.[TODO]
    }
}

async function procesoDeSincronizacionConAikonCompletoTransaccion() {
    const { tokenId, fechaUnixObtencionToken, id } = await AikonApiObtenerTokenService.fetchToken()
    // Sync de Marca
    const marcaUpsertBatchOperations = await SyncMarca.prepararSincronizacion(tokenId)

    // Sync de Categoría (Ref01)
    const referencia01UpsertBatchOperations = await SyncReferencia01.prepararSincronizacion(tokenId)

    // Sync de Rubro (Ref02)
    const referencia02UpsertBatchOperations = await SyncReferencia02.prepararSincronizacion(tokenId)

    // Sync Familia
    const familiaUpsertBatchOperations = await SyncFamilia.prepararSincronizacion(tokenId)
    
    // Sync de Artículos
    const articuloPrecioBatchOperations = await SyncArticuloPrecioService.prepararSincronizacion(tokenId);

    // Transacciones que ejecutan todos los CREATE y UPDATE necesarios para cada tabla.
    await PrismaService.executeTransactionFromBatchOperations(marcaUpsertBatchOperations)
    await PrismaService.executeTransactionFromBatchOperations(referencia01UpsertBatchOperations)
    await PrismaService.executeTransactionFromBatchOperations(referencia02UpsertBatchOperations)
    await PrismaService.executeTransactionFromBatchOperations(familiaUpsertBatchOperations)
    await PrismaService.executeTransactionFromBatchOperations(articuloPrecioBatchOperations)

    console.log(fechaUnixObtencionToken, id)
}
