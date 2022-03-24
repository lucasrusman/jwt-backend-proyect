
const jwt = require('jsonwebtoken')



const generarJWT = ( uid = '' ) =>{
    return new Promise( (resolve, reject)=>{
        const user = req.body
        console.log(user)
    
        jwt.sign({user}, 'secretkey', {expiresIn: '10h'} , (err, token)=>{
            if (err){
                console.log(err)
                reject('No se pudo generar el JWT')
            }else{
                resolve(token)
            }
        })

    })

}
module.exports = {
    generarJWT
}