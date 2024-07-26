import { PrismaClient, aikon_articulo, Prisma, PrismaPromise } from "@prisma/client";
import { CloudStorageService } from '../servicios/CloudStorageService'
import { ProcesoInfo } from "../entidades/ProcesoInfo";
import { ProcesoInfoDetalle } from "../entidades/ProcesoInfoDetalle";

const prisma = new PrismaClient();

export class PrismaService {
    static fetchAllAikonArticulos(): Promise<aikon_articulo[]> {
        return prisma.aikon_articulo.findMany();
    }

    static createAikonArticulo(data: Prisma.aikon_articuloUncheckedCreateInput): PrismaPromise<aikon_articulo> {
        return prisma.aikon_articulo.create({ data });
    }

    static updateAikonArticulo(codigo: string, data: Prisma.aikon_articuloUpdateInput): PrismaPromise<aikon_articulo> {
        return prisma.aikon_articulo.update({ where: { aik_ar_codigo: codigo }, data });
    }

    static async executeTransactionFromBatchOperations(operations: Prisma.PrismaPromise<any>[]) {
        return prisma.$transaction(operations);
    }

    static async generateBackupForProcesoDeSincronizacionConAikonCompleto () {
        // TODO -> Agregar backup de proceso_info
        const [
            aikon_familia,
            aikon_categoria,
            aikon_rubro,
            aikon_marca,
            aikon_articulo,
            aikon_historial_costo_neto,
            aikon_historial_stock_total,
            aikon_historial_utilidad,
            articulo_web,
            articulo_precio
        ] = await Promise.all([
            prisma.aikon_familia.findMany(),
            prisma.aikon_referencia01.findMany(),
            prisma.aikon_referencia02.findMany(),
            prisma.aikon_marca.findMany(),
            prisma.aikon_articulo.findMany(),
            prisma.aikon_articulo_historial_costo_neto.findMany(),
            prisma.aikon_articulo_historial_stock_total.findMany(),
            prisma.aikon_articulo_historial_utilidad.findMany(),
            prisma.articulo_web.findMany(),
            prisma.articulo_precio.findMany()
        ])
        const backupData = {
            aikon_familia,
            aikon_categoria,
            aikon_rubro,
            aikon_marca,
            aikon_articulo,
            aikon_historial_costo_neto,
            aikon_historial_stock_total,
            aikon_historial_utilidad,
            articulo_web,
            articulo_precio
        }
        /*  Save backupData to Cloud Storage in a special bucket designed for storing database backupfiles.
            BackupsGeneradosProcesoCompletoSincronizacion -> [año-mes] -> [dia-hora.json]
            BackupsGeneradosProcesoPrecioStockSincronizacion.
            Además, sería buena idea cada 2 - 3 meses, limpiar los archivos backups.
         */
        await CloudStorageService.guardarJsonBackupCompleto(backupData)
    }

    static async crearProcesoInfo(procesoInfo: ProcesoInfo): Promise<number> {
        const createdProceso = await prisma.proceso_info.create({
            data: {
                fecha_hora_inicio: procesoInfo.fecha_hora_inicio,
                estado_ejecucion: procesoInfo.estado_ejecucion,
                id_tipo_proceso_info: procesoInfo.id_tipo_proceso
            }
        })
        return createdProceso.id
    }
    static async finalizarProcesoInfo(procesoInfo: ProcesoInfo) {
        const updatedProceso = await prisma.proceso_info.update({
            where: {
                id: procesoInfo.id
            },
            data: {
                fecha_hora_fin: procesoInfo.fecha_hora_fin,
                estado_ejecucion: procesoInfo.estado_ejecucion,
                tiempo_ejecucion: procesoInfo.tiempo_ejecucion,
                error: procesoInfo.error,
                mensaje_error: procesoInfo.mensaje_error
            }
        })
        return updatedProceso
    }

    static async crearProcesoInfoDetalle (procesoInfoDetalle: ProcesoInfoDetalle): Promise<number> {
        const createdProcesoInfoDetalle = await prisma.proceso_info_detalle.create({
            data: {
                nombre_paso: procesoInfoDetalle.nombre_paso,
                estado_ejecucion: procesoInfoDetalle.estado_ejecucion,
                id_proceso_info: procesoInfoDetalle.id_proceso_info
            }
        })
        return createdProcesoInfoDetalle.id
    }

    static async finalizarProcesoInfoDetalle (procesoInfoDetalle: ProcesoInfoDetalle) {
        const updatedProcesoInfoDetalle = await prisma.proceso_info_detalle.update({
            where: {
                id: procesoInfoDetalle.id
            },
            data: {
                tiempo_ejecucion: procesoInfoDetalle.tiempo_ejecucion,
                estado_ejecucion: procesoInfoDetalle.estado_ejecucion,
                error: procesoInfoDetalle.error,
                mensaje_error: procesoInfoDetalle.mensaje_error
            }
        })
        return updatedProcesoInfoDetalle
    }
}