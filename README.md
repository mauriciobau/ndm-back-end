# Recuperação de senha
**RF** - Requisitos Funcionais
- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF** - Requisitos Não Funcionais
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar o Amazon SES para envios em produlção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN** - Regras de Negócio
- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do perfil
**RF**
- O usuário deve poder atualizar seu perfil, nome, email, senha;

**RNF**

**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

