# instagram-bot

Script capaz de explorar quase todas as funcionalidades do instagram:

- [x] Dar Follow
- [x] Dar Unfollow
- [x] Abrir primeira foto de um perfil 
- [x] Ir de foto em foto 
- [x] Curtir foto 
- [x] Visualizar Stories
- [ ] Comentar nas fotos
- [ ] Enviar ou responder mensagens
- [ ] Visualizar os reels

### Utilização simples

```javascript
const InstagramBot = require('./InstagramBot')

const bot = new InstagramBot()

await bot.init()
await bot.login(settings[0].username, settings[0].password)

await bot.enterAUserProfile('felipedasr')
await bot.followUser()
```
> Script rodando: 2021/10
