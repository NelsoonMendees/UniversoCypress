///<reference types="Cypress" />

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', function () {

    context('Quando o usuário é muito bom', function () {

        const user = {
            name: 'Skynet',
            email: 'skynet@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
        cy.postUser(user)
        })

        it('deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('Quando o usuário é bom mas a senha é incorretamente', function () {

        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function(){
                user.password = 'abc123'
            })
        })

        it('Deve notificar erro de credenciais', function (){
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = "Ocorreu um erro ao fazer login, verifique suas credenciais."
            loginPage.toast.shouldHaveText(message)
        })
    })

    context('Quando o formato do email é invalido', function () {
        const emails = [
            'test.com.br',
            '@gmail.com',
            '@',
            'nelson@',
            '212121',
            '&%rer%@',
            'xpto123'
        ]

        before(function(){
            loginPage.go()
        })

        emails.forEach(function(email) {
            it('não deve logar com o email: ' + email, function(){
                const user = {email: email, password: 'pwd123'}

                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })
    })

    context('quando não preencho nenhum campo', function () {
        const alertMessages = [
          'E-mail é obrigatório',
          'Senha é obrigatória'
        ]
    
        before(function () {
          loginPage.go()
          loginPage.submit()
        })
        alertMessages.forEach(function (alert) {
          it('deve exibir ' + alert.toLowerCase(), function () {
            loginPage.alert.haveText(alert)
          })
        })
      })


})