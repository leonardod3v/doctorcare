//Adicionar o evento scroll, utilizando o listener para a função onScroll
window.addEventListener('scroll', onScroll)

//Funções executadas no onScroll
onScroll()
function onScroll() {
    showNavOnScroll()
    showBackToTopButtonOnScroll()

    //Argumentos da função que ficarão no lugar de "section"
    //Todas as vezes que o scroll for executado, serão executados também o home, services, about e contact
    activateMenuAtCurrentSection(home)
    activateMenuAtCurrentSection(services) 
    activateMenuAtCurrentSection(about)
    activateMenuAtCurrentSection(contact)  
}

//Função que será responsável por deixar cada ícone do menu ativo, quando estivermos com a tela em uma seção
function activateMenuAtCurrentSection(section) {

    //Não se altera o valor de uma constante
    const targetLine = scrollY + innerHeight / 2

    //*===== LÓGICA =====*//  
    //Verificar se a seção passou da linha
    //Quais dados vou precisar?
    //offSetTop neste caso é um elemento que retornará o valor de onde inicia a borda superior de um outro elemento
    const sectionTop = section.offsetTop
    //Verificando a altura de determinada seção
    const sectionHeight = section.offsetHeight
    //console.log(sectionHeight)

    //O topo da seção chegou ou ultrapassou a linha alvo
    //Dentro de variáveis, também podem ser utilizados comparativos 
    const sectionTopReachOrPassedTargetline = targetLine >= sectionTop
    
    //Com o console.log, pode ser utilizado string para escrever algo e logo após, a variável que retornará o resultado TRUE ou FALSE
    //console.log('O topo da seção chegou ou passou da linha?',sectionTopReachOrPassedTargetline)


    //*===== LÓGICA =====*//  
    //Verificar se a base está abaixo da linha alvo
    //Quais dados vou precisar?
    
    //Onde a seção termina de fato?
    const sectionEndsAt = sectionTop + sectionHeight

    //O final da seção passou da linha alvo
    const sectionEndPassedTargetLine = sectionEndsAt <= targetLine

    //console.log('O fundo da seção passou da linha?', sectionEndPassedTargetLine)

    //Limites da seção (topo e fundo)
    const sectionBoundaries = 
    sectionTopReachOrPassedTargetline && 
    !sectionEndPassedTargetLine

    const sectionId = section.getAttribute('id')
    //Fazendo o caminho na classe menu, serão "chamados" todos os elementos dentro de a que possuirem um id
    const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
    
}

//Função para alterar a cor da caixa de navegação, quando for utilizada a rolagem de tela
function showNavOnScroll() {
    //ScrollY sempre vai retornar o posicionamento do Scroll 
    if(scrollY > 0) {
        //Chamando o id navigation, a classe a qual ele pertence e depois adicionando-a conforme definido em CSS 
        // *No HTML a class permanece vazia para então adicionar no JS
        //Adicionando o scroll
        navigation.classList.add('scroll')
    }
    //Removendo o scroll
    else {
        navigation.classList.remove('scroll')
    }
}

function showBackToTopButtonOnScroll() {
    //ScrollY sempre vai retornar o posicionamento do Scroll 
    //Para definir exatamente em qual momento o botão deve aparecer, utiliza-se o console.log(scrollY) para verificar a posição
    if(scrollY > 500) {
        //O backToTopButton irá receber uma classe chamada show
        backToTopButton.classList.add('show')
    }
    //Removendo o show
    else {
        backToTopButton.classList.remove('show')
    }
}

//Função para abrir o menu de navegação
function openMenu() {
    document.body.classList.add('menu-expanded')
}

//Função para fechar o menu de navegação 
function closeMenu() {
    document.body.classList.remove('menu-expanded')
}

//ScrollReveal recebendo objeto {} como argumento 
ScrollReveal({
    //Animação de tela, onde o conteúdo aparecerá de cima para baixo
    origin: 'top',
    distance: '30px',
    duration: 700,
//Ordem de revelação dos elementos, à medida em que for ativada a rolagem
}).reveal(`
#home,
#home img,
#home .stats,
#services,
#services header,
#services .card,
#about,
#about header,
#about .content`)