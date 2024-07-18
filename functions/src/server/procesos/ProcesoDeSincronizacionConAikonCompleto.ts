import { SyncArticuloPrecioService } from '../servicios/SyncArticuloPrecioService';
import { AikonApiObtenerTokenService } from '../servicios/AikonApiObtenerTokenService';

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
async function procesoDeSincronizacionConAikonCompletoTransaccion() {
    const { tokenId, fechaUnixObtencionToken, id } = await AikonApiObtenerTokenService.fetchToken()
    const articuloPrecioPromises = await SyncArticuloPrecioService.prepararSincronizacion(tokenId);

    console.log(fechaUnixObtencionToken, id)
}

export async function procesoDeSincronizacionConAikonCompleto() {
    try {
        // Info de inicio de ejecución del proceso.
        await procesoDeSincronizacionConAikonCompletoTransaccion()
    } catch (e) {
        // Info de Error en el proceso.
        console.error(e)
    } finally {
        // Info de fin de ejecución del proceso.
    }
}
