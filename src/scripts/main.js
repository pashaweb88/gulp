window.onload = function(){

  $('.card1').on('mouseover',function(){
    resetMain()

    $('.main').addClass('main1');
  })

  $('.card2').on('mouseover',function(){
    resetMain()
    $('.main').addClass('main2');
  })

  $('.card3').on('mouseover',function(){
    resetMain()
    $('.main').addClass('main3');
  })

  $('.main').on('mouseleave',function(){
    resetMain();
  })
  function resetMain(){
    $('.main').removeClass('main1 main2 main3');
  }


}