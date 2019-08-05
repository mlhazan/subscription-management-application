const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractStrategy = require("passport-jwt").ExtractJwt;


module.exports = function AuthMiddleware(app){
    const authStrategy = new JwtStrategy({
        secretOrKey:process.env.AUTH_SECRET,
        algorithms:["HS256"],
        issuer: process.env.TOKEN_ISSUER,
        ignoreExpiration: false,
        jwtFromRequest: ExtractStrategy.fromAuthHeaderWithScheme("Bearer") //Authorization : Bearer <Token>
    },
        async(payload, done)=>{
            let id = parseInt(payload.sub);
            if(id){
                done(null, id);
            } else{
                done(done, false);
            }
        }
    );
    passport.use(authStrategy);
    app.use(passport.initialize());
}