
# Consert-Car

Sistema mobile desenvolvido com React-Native para o gerenciamento eficiente de clientes, veículos, agendamentos e ordens de serviço da oficina mecânica __Consert-Car__.

  

## 1. Sobre o projeto

A __Consert-Car__ é uma empresa do ramo automotivo especializada na manutenção preventiva e corretiva de veículos leves, como carros de passeio e utilitários pequenos. Atualmente, a empresa realiza suas atividades de forma manual, utilizando anotações em cadernos ou controles informais para registrar serviços, clientes e movimentações financeiras.

Com o crescimento da demanda e da quantidade de clientes, surgiu a necessidade de modernizar a gestão da oficina, tornando os processos mais organizados, rápidos e seguros.

---

## 2. Problemas a serem resolvidos

Atualmente, a oficina não utiliza nenhum sistema de gestão, o que gera diversos problemas administrativos e operacionais. Devido a essa falta, diversos processos administrativos são realizados de forma manual, comprometendo a organização das informações e a tomada de decisões. A ideia principal da criação desse sistema é sanar os problemas operacionais, construindo uma __central de inteligência móvel__ que acompanhe o mecânico desde a entrada do veículo até a entrega das chaves.

  

### 2.1. Pilares da solução

-  __A. Digitalização do "chão de fábrica":__ Diferente de sistemas desktops que ficam isolados em uma mesa, o aplicativo permite que o diagnóstico e a abertura da ordem de serviço ocorram ao lado do veículo.

- __B. Centralização financeira e de estoque:__ O sistema integrará a saída de peças do estoque diretamente com o custo da mão de obra na ordem de serviço. Isso garante que cada parafuso utilizado seja devidamente cobrado e que o lucro líquido de cada serviço seja calculado automaticamente.

-__C. Gestão de relacionamento com o cliente:__ A solução prevê a automação da comunicação. Ao finalizar um serviço no app, o cliente pode receber automaticamente um PDF da nota de serviço e do checklist via WhatsApp, profissionalizando a imagem da empresa.

---

## 3. Objetivos do sistema

O sistema Consert-Car têm como objetivo principal modernizar os processos administrativos e operacionais da oficina mecânica, substituindo controles manuais por um ambiente digital confiável e acessível.

### 3.1. Objetivos específicos

- Reduzir erros operacionais
- Melhorar o controle de ordens de serviço
- Automatizar o registro financeiro
- Melhorar a comunicação com o cliente
- Aumentar a produtividade da equipe

---

## 4. Funcionalidades do sistema

O sistema contará com as seguintes funcionalidades:

### 4.1. Cadastro de clientes

Permite registrar novos clientes contendo __nome completo__, __telefone__ e __CPF__.

### 4.2. Cadastro de veículos

Permite associar veículos aos clientes contendo __marca__, __modelo__, __placa__, __ano__ e __cor__.

### 4.3. Ordes de serviço

Permite __criar nova ordem de serviço__, __adicionar serviços realizados__, __registrar peças utilizadas__ e __calcular valor total automaticamente__.

---

## 5. Tecnologias utilizadas

- React Native
- TypeScript
- Expo
- Node.js
- Git & GitHub

---

## 6. Arquitetura do sistema

O sistema segue uma arquitetura baseada em componentes, organizada da seguinte forma:

- Interface mobile desenvolvida em React Native
- Gerenciamento de estado local
- Separação entre lógica e interface
- Organização modular do código