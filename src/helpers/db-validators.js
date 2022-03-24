
const esUsuario = async(id)=>{
    const existeUser = await query.users
    if (!existeUser){
        return new Error(`El id: ${id} no existe en la base de datos`)
    }
}
module.exports = {esUsuario}