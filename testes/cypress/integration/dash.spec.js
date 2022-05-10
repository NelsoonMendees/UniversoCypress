///<reference types="Cypress" />
import loginPage from '../support/pages/login';
import dashPage from '../support/pages/dash';

import {custumer, provider, appointment} from '../support/factories/dash'

describe("Dashboard", function () {

    context("Quando o cliente faz um agendamento no app mobile", function () {

        before(function () {
            cy.postUser(provider) //reconstrução prestador de serviço
            cy.postUser(custumer) //reconstrução cliente

            cy.apiLogin(custumer) //simula o cliente realizando login no app
            cy.setProviderId(provider.email) //pega o id do prestador de serviço
            cy.createAppointment(appointment.hour) //realiza o agendamento do serviço
        })

        it('O mesmo deve ser exibido no dashboard', function () {

            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()

            dashPage.calendarShoudBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)

            dashPage.appointmentShoudBe(custumer, appointment.hour)
        })
    })
})