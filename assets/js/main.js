getViaAjax("menu", showMenu);
getViaAjax("slider", showSlides);
getViaAjax("links", showLinks);
function getViaAjax(fileName, specificFunction) {
  $.ajax({
    url: "assets/data/" + fileName + ".json",
    method: "get",
    dataType: "json",
    success: function (jsonData) {
      specificFunction(jsonData);
    },
    error: function (xhr, status, errorMessage) {
      console.log(xhr);
      console.log(status);
      console.log(errorMessage);
    },
  });
}
function addingToCart(e){
  e.preventDefault();
  var novelId = Number(this.dataset.id);
  var novelsInCart = [];
  if(!localStorage.getItem("novelsToBuy")){
    var novel = {id:novelId, quantity:1};
    novelsInCart.push(novel);
    localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCart));
  }
  else {
    var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
    var existingNovelInCart = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
    if(existingNovelInCart.length){
      existingNovelInCart[0].quantity+=1;
      localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
    }
    else {
      var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
          var novel = {id:novelId, quantity:1};

      novelsInCartLocalStorage.push(novel);
      localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
    }

  }
  numberOfNovelsInCart();

}
function numberOfNovelsInCart(){
  var numberOfNovels;
  if (!localStorage.getItem("novelsToBuy")){
    numberOfNovels = "";
  }
  else {
    var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
    var quantity = 0;
    novelsInCartLocalStorage.forEach(novel => {
      quantity+=novel.quantity;
    });
    numberOfNovels=quantity;
  }
  var cartNumbers = document.querySelectorAll(".numberOfNovels");
  for (cartNumber in cartNumbers){
    cartNumbers[cartNumber].innerHTML=numberOfNovels;
  }
}

function showMenu(menuJsonData) {
  var writingMenu = "";
  var writingSubmenu = "";
  var writingTabletMenu = "";
  for (partOfMenu in menuJsonData) {
    if (menuJsonData[partOfMenu].primaryHref != "#") {
      writingMenu += `<li class="linkPaddingLeftRight">
                            <a href="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}</a>
                        </li>`;
      writingTabletMenu += `<li>
                            <a href="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}</a>
                        </li>`;
    } else {
      writingMenu += `<li class="includesSubmenu linkPaddingLeftRight">
                            <a href="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}<span class="fa fa-chevron-down tinyMarginLeft" aria-hidden="true"></span>
                            </a>
                        </li>`;
      writingTabletMenu += `<li class="includesTabletSubmenu linkPaddingTopBottom">
                                    <a href="${menuJsonData[partOfMenu].primaryHref}" class="whiteColor">${menuJsonData[partOfMenu].primaryLabel}<span class="fa fa-chevron-down tinyMarginLeft" aria-hidden="true"></span>
                                    </a>
                                <ul class="displayNone">`;
      for (partOfSubmenu in menuJsonData[partOfMenu].secondaryHrefs) {
        writingSubmenu += `<li class="linkPaddingTopBottom linkPaddingLeftRight">
                                                     <a href="${menuJsonData[partOfMenu].secondaryHrefs[partOfSubmenu]}" class="whiteColor">${menuJsonData[partOfMenu].secondaryLabels[partOfSubmenu]}</a>
                                                 </li>`;
        writingTabletMenu += `<li class="linkPaddingTopBottom">
                                                 <a href="${menuJsonData[partOfMenu].secondaryHrefs[partOfSubmenu]}" class="whiteColor">${menuJsonData[partOfMenu].secondaryLabels[partOfSubmenu]}</a>
                                             </li>`;
      }
      writingTabletMenu += "</ul></li>";
      document.querySelector("#submenu").innerHTML = writingSubmenu;
    }
  }
  document.querySelector("#menu").innerHTML = writingMenu;
  document.querySelector("#tabletMenu").innerHTML = writingTabletMenu;
  numberOfNovelsInCart();
}
function showSlides(slidesJsonData) {
  var writingSlides = "";
  for (slide in slidesJsonData) {
    if (slide == 0) {
      writingSlides += `<img class="height100vh" src="${slidesJsonData[slide].src}" alt="${slidesJsonData[slide].alt}"/>`;
    } else {
      writingSlides += `<img class="displayNone height100vh" src="${slidesJsonData[slide].src}" alt="${slidesJsonData[slide].alt}"/>`;
    }
  }
  document.querySelector("#slider").innerHTML = writingSlides;
}
function slideShow() {
  var slides = $("#slider img");
  for (var i = 0; i < slides.length; i++) {
    if (i != slides.length - 1) {
      if ($(slides[i]).hasClass("displayNone") == false) {
        $(slides[i]).addClass("displayNone");
        $(slides[i + 1]).removeClass("displayNone");
        break;
      }
    } else {
      $(slides[i]).addClass("displayNone");
      $(slides[0]).removeClass("displayNone");
    }
  }
  setTimeout("slideShow()", 3000);
}
slideShow();
$("#menu").on("mouseenter", ".includesSubmenu", function () {
  $("#submenu").parent().parent().removeClass("displayNone");
});
$("#submenu").parent().parent().mouseleave(function () {
    $("#submenu").parent().parent().addClass("displayNone");
  });
$("#hamburger").click(function () {
  $("#tabletMenu").slideToggle("slow");
});
$("#tabletMenu").on("click", ".includesTabletSubmenu", function () {
  $(".includesTabletSubmenu ul").slideToggle("slow");
});
function showLinks(links) {
  var writingLinks = "";
  for (link in links) {
    writingLinks += `<li>
                            <a href="${links[link].href}" class="whiteColor">${links[link].label}</a>
                        </li>`;
  }
  document.querySelector("#linkList").innerHTML = writingLinks;
}
if (window.location =="https://markostojanovic4419thegreatestgift.github.io/index.html") {
  getViaAjax("purpose", showPurposes);
  getViaAjax("contactInformation", showContactInformationList);
  function showPurposes(purposes) {
    var writingPurposes = `<option value="0">Choose...</option>`;
    for (purpose in purposes) {
      writingPurposes += `<option value="${purposes[purpose].id}">${purposes[purpose].purposeName}</option>`;
    }
    document.querySelector("#purpose").innerHTML = writingPurposes;
  }
  $("#send").click(function () {
    var firstNameVar = $("#firstName").val();
    var lastNameVar = $("#lastName").val();
    var emailAddressVar = $("#emailAddress").val();
    var purposeVar = $("#purpose").find(":selected").val();
    var messageVar = $("#message").val();
    var sendVar = $("#send").val();
    var nameModel = /^[A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+([ ][A-ZČĆŽŠĐ][A-zČĆŽŠĐčćžšđ']+)*$/;
    var emailAddressModel = /^(?=.{6,30}@)[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/;
    var numberOfErrors = 0;
    if (firstNameVar != "") {
      if (nameModel.test(firstNameVar)) {
        $("#firstNameNote").html("You filled this field properly!");
        $("#firstNameNote").removeClass("redColor");
        $("#firstNameNote").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#firstNameNote").html(
          "You did not fill this field properly. Example: Al McKay"
        );
        $("#firstNameNote").removeClass("greenColor");
        $("#firstNameNote").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#firstNameNote").html("This field must not be left blank!");
      $("#firstNameNote").removeClass("greenColor");
      $("#firstNameNote").addClass("redColor");
    }
    if (lastNameVar != "") {
      if (nameModel.test(lastNameVar)) {
        $("#lastNameNote").html("You filled this field properly!");
        $("#lastNameNote").removeClass("redColor");
        $("#lastNameNote").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#lastNameNote").html(
          "You did not fill this field properly. Example: O'Bryant Junior"
        );
        $("#lastNameNote").removeClass("greenColor");
        $("#lastNameNote").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#lastNameNote").html("This field must not be left blank!");
      $("#lastNameNote").removeClass("greenColor");
      $("#lastNameNote").addClass("redColor");
    }
    if (emailAddressVar != "") {
      if (emailAddressModel.test(emailAddressVar)) {
        $("#emailAddressNote").html("You filled this field properly!");
        $("#emailAddressNote").removeClass("redColor");
        $("#emailAddressNote").addClass("greenColor");
      } else {
        numberOfErrors++;
        $("#emailAddressNote").html(
          "You did not fill this field properly. Example: 1james.caa1n@3mail.co.us"
        );
        $("#emailAddressNote").removeClass("greenColor");
        $("#emailAddressNote").addClass("redColor");
      }
    } else {
      numberOfErrors++;
      $("#emailAddressNote").html("This field must not be left blank!");
      $("#emailAddressNote").removeClass("greenColor");
      $("#emailAddressNote").addClass("redColor");
    }
    if (purposeVar != 0) {
      $("#purposeNote").html("You selected a purpose properly!");
      $("#purposeNote").removeClass("redColor");
      $("#purposeNote").addClass("greenColor");
    } else {
      numberOfErrors++;
      $("#purposeNote").html(
        "You did not select a purpose. Example: Suggestion"
      );
      $("#purposeNote").removeClass("greenColor");
      $("#purposeNote").addClass("redColor");
    }
    if (messageVar != "") {
      $("#messageNote").html("You filled this field properly!");
      $("#messageNote").removeClass("redColor");
      $("#messageNote").addClass("greenColor");
    } else {
      numberOfErrors++;
      $("#messageNote").html("This field must not be left blank!");
      $("#messageNote").removeClass("greenColor");
      $("#messageNote").addClass("redColor");
    }
    if (numberOfErrors == 0) {
      $.ajax({
        url: "#",
        method: "post",
        dataType: "json",
        data: {
          firstNameProperty: firstNameVar,
          lastNameProperty: lastNameVar,
          emailAddressProperty: emailAddressVar,
          purposeProperty: purposeVar,
          messageProperty: messageVar,
          sendProperty: sendVar,
        },
      });
    }
  });
  function showContactInformationList(contactInformation) {
    var writingContactInformationList = "";
    for (partOfContactInformation in contactInformation) {
      writingContactInformationList += `<li class="blockPaddingBottom">
                                                <h5>${contactInformation[partOfContactInformation].primaryLabel}</h5>
                                                <ul class="displayNone">`;
      for (tinyPartOfContactInformation in contactInformation[
        partOfContactInformation
      ].secondaryLabels) {
        writingContactInformationList += `<li class="sublistPaddingLeft">
                                                            <h6>${contactInformation[partOfContactInformation].secondaryLabels[tinyPartOfContactInformation]}</h6>
                                                        </li>`;
      }
      writingContactInformationList += "</ul></li>";
    }
    document.querySelector("#contactInformationList").innerHTML = writingContactInformationList;
  }
  $("#contactInformationList").on("mouseenter", "li", function () {
    $(this).find("ul").slideDown();
  });
  $("#contactInformationList").on("mouseleave", "li", function () {
    $(this).find("ul").slideUp();
  });
}
if ((window.location == "https://markostojanovic4419thegreatestgift.github.io/author.html")||(window.location == "https://markostojanovic4419thegreatestgift.github.io/index.html")) {
  $(".descriptiveImage").mouseover(function () {
    $(this).addClass("descriptiveImageBoxShadow");
  });
  $(".descriptiveImage").mouseleave(function () {
    $(this).removeClass("descriptiveImageBoxShadow");
  });
}
if ((window.location == "https://markostojanovic4419thegreatestgift.github.io/comedyNovels.html")||(window.location == "https://markostojanovic4419thegreatestgift.github.io/dramaNovels.html")) {



  function filterChange(){
if (window.location == "https://markostojanovic4419thegreatestgift.github.io/comedyNovels.html"){
 
  getViaAjax("comedyNovels", showNovels);

}
if (window.location == "https://markostojanovic4419thegreatestgift.github.io/dramaNovels.html"){

  getViaAjax("dramaNovels", showNovels);
  
}
  }
    var novelsJsonData = "";
  $("#titles").on("mouseover", ".descriptiveImage", function () {
    $(this).addClass("descriptiveImageBoxShadow");
  });
  $("#titles").on("mouseleave", ".descriptiveImage", function () {
    $(this).removeClass("descriptiveImageBoxShadow");
  });
  getViaAjax("publishingHouses", showPublishingHouses);
  getViaAjax("availability", showAvailability);
  getViaAjax("sortCategories", showSortCategories);
  function showSubgenres(subgenres) {
    var writingSubgenres = "";
    for (subgenre in subgenres) {
      writingSubgenres += `
                                <li class="displayFlex">
                                    <input type="checkbox" name="subgenresName" value="${subgenres[subgenre].name}" class="tinyMarginTop tinyMarginRight subgenres" id="${subgenres[subgenre].id}"/><h5>${subgenres[subgenre].name}</h5>
                                </li>`;
    }
    document.querySelector("#subgenres").innerHTML = writingSubgenres;
    $(".subgenres").change(filterChange);
  }
  function showAuthors(authors) {
    var writingAuthors = "";
    for (author in authors) {
      writingAuthors += `
                                <li class="displayFlex">
                                    <input type="checkbox" name="authorsName" value="${authors[author].firstName} ${authors[author].lastName}" class="tinyMarginTop tinyMarginRight authors" id="${authors[author].id}"/><h5>${authors[author].firstName} ${authors[author].lastName}</h5>
                                </li>`;
    }
    document.querySelector("#authors").innerHTML = writingAuthors;
    $(".authors").change(filterChange);
  }
  function showPublishingHouses(publishingHouses) {
    var writingPublishingHouses = "";
    for (publishingHouse in publishingHouses) {
      writingPublishingHouses += `
                                <li class="displayFlex">
                                    <input type="checkbox" name="publishingHousesName" value="${publishingHouses[publishingHouse].name}"  class="tinyMarginTop tinyMarginRight publishingHouses" id="${publishingHouses[publishingHouse].id}"/><h5>${publishingHouses[publishingHouse].name}</h5>
                                </li>`;
    }
    document.querySelector(
      "#publishingHouses"
    ).innerHTML = writingPublishingHouses;
    $(".publishingHouses").change(filterChange);
  }
  function showAvailability(availability) {
    var writingAvailability = "";
    for (availabilityStatus in availability) {
      writingAvailability += `
                                <li class="displayFlex">
                                    <input type="checkbox" name="availabilityName" value="${availability[availabilityStatus].status}" class="tinyMarginTop tinyMarginRight availability" id="${availability[availabilityStatus].id}"/><h5>${availability[availabilityStatus].status}</h5>
                                </li>`;
    }
    document.querySelector("#availability").innerHTML = writingAvailability;
    $(".availability").change(filterChange);
  }
  $("#subgenresLabel").click(function () {
    $("#subgenres").slideToggle("slow");
  });
  $("#authorsLabel").click(function () {
    $("#authors").slideToggle("slow");
  });
  $("#publishingHousesLabel").click(function () {
    $("#publishingHouses").slideToggle("slow");
  });
  $("#availabilityLabel").click(function () {
    $("#availability").slideToggle("slow");
  });
  function showSortCategories(sortCategories) {
    var writingSortCategories = "";
    for (sortCategory in sortCategories) {
      writingSortCategories += `
                                    <option value="${sortCategories[sortCategory].id}">${sortCategories[sortCategory].categoryName}
                                    </option>
                                    `;
    }
    document.querySelector("#sort").innerHTML = writingSortCategories;
  }

  function getNovels(novels){
    novelsJsonData = novels;
  }
  function showNovels(novels) {
  novels=filterBySubgenres(novels);
  novels=filterByAuthors(novels);
  novels=filterByPublishingHouses(novels);
  novels=filterByAvailabilities(novels);
  novels=filterByPriceRange(novels);
  novels=filterByTitle(novels);
  novels=sort(novels);
  var writingNovels = "";
  if(novels.length == 0){
    writingNovels=`<div class="width100 displayFlex justifyContentCenter blockPaddingTop"><h4 class="redColor">Unfortunately, there are no novels matching your search.</h4><div>`;
  }else {
    for (novel in novels) {
      writingNovels += `
                            <div class="width25 tabletWidth45 mobileWidth100 floatLeft ${novel == novels.length - 1? "": "novelMarginRight"}">
                                <img class="borderRadius descriptiveImage" src="${novels[novel].image.src}" alt="${novels[novel].image.alt}"/>
                                <h4 class="redColor textAlignCenter">${novels[novel].title}</h4>
                                <h5 class="redColor textAlignCenter">${novels[novel].author}</h5>
                                <input type="button" class="width100 proceed borderRadius redBackgroundColor whiteColor tinyPadding tinyMarginBottom" value="Proceed!"/>
                                <div class="displayNone positionFixed modal width100 redColor height100vh alignItemsCenter">
                                    <div class="whiteBackgroundColor width45 positionRelative margin0Auto modalDialog borderRadius tinyPadding">
                                        <div class="displayFlex justifyContentSpaceBetween">
                                            <h4>${novels[novel].title}</h4>
                                            <h4 class="exit">&times;</h4>
                                        </div>
                                        <div class="modalBody tinyPadding">
                                            <img class="borderRadius descriptiveImage" src="${novels[novel].image.src}" alt="${novels[novel].image.alt}"/>
                                            <h5 class="tinyMarginTop">Title: ${novels[novel].title}</h5>
                                            <h5>Author: ${novels[novel].author}</h5>
                                            <h5>Price: $${novels[novel].price}</h5>
                                            <h5>Subgenre: ${novels[novel].subgenre}</h5>
                                            <h5>Year of issue: ${novels[novel].publishingInformation.yearOfIssue}</h5>
                                            <h5>Publishing house: ${novels[novel].publishingInformation.publishingHouse}</h5>
                                            <h5>Number of pages: ${novels[novel].numberOfPages}</h5><h5>Availability: <span class="${novels[novel].availability =="In stock"? "greenColor": "redColor"}">${novels[novel].availability}</span></h5>
                                            <p class="textAlignJustify">${novels[novel].description}</p>
                                            <input type="button" class="width100 addToCart borderRadius redBackgroundColor whiteColor tinyPadding tinyMarginTop" data-id="${novels[novel].id}" value="Add to cart!" ${novels[novel].availability == "In stock"?"":"disabled"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;

    }}
    document.querySelector("#titles").innerHTML = writingNovels;
    $(".addToCart").click(addingToCart);
  }
  $("#titles").on("click", ".proceed", function () {
    $(this).parent().find(".modal").removeClass("displayNone");
    $(this).parent().find(".modal").addClass("displayFlex");
  });
  $("#titles").on("click", ".exit", function () {
    $(this).parent().parent().parent().addClass("displayNone");
    $(this).parent().parent().parent().removeClass("displayFlex");
  });
  function sort(novels) {

    if ($("#sort").val() == '0'){
          return novels;
      }

    if ($("#sort").val() == '1') {
        
      novels.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
            return 1;
          }
          if (a.title == b.title) {
            return 0;
          }
      });
    }
    if ($("#sort").val() == '2') {
        novels.sort(function (a, b) {
           
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
              return 1;
            }
            if (a.title == b.title) {
              return 0;
            }
        });
      }
      if ($("#sort").val() == '3') {
        novels.sort(function (a, b) {
           
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
              return 1;
            }
            if (a.price == b.price) {
              return 0;
            }
        });
      }
      if ($("#sort").val() == '4') {
        novels.sort(function (a, b) {
           
          if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
              return 1;
            }
            if (a.price == b.price) {
              return 0;
            }
        });
      }
      if ($("#sort").val() == '5') {
        novels.sort(function (a, b) {
           
          if (a.publishingInformation.yearOfIssue < b.publishingInformation.yearOfIssue) {
            return -1;
          }
          if (a.publishingInformation.yearOfIssue > b.publishingInformation.yearOfIssue) {
              return 1;
            }
            if (a.publishingInformation.yearOfIssue == b.publishingInformation.yearOfIssue) {
              return 0;
            }
        });
      }
      if ($("#sort").val() == '6') {
        novels.sort(function (a, b) {
           
          if (a.publishingInformation.yearOfIssue > b.publishingInformation.yearOfIssue) {
            return -1;
          }
          if (a.publishingInformation.yearOfIssue < b.publishingInformation.yearOfIssue) {
              return 1;
            }
            if (a.publishingInformation.yearOfIssue == b.publishingInformation.yearOfIssue) {
              return 0;
            }
        });
      }
    return novels;
  }
   function filterByTitle(novels){
      var userTitle = $("#searchTitles").val();
      var filteredNovelsByTitle = novels.filter(function(novel){
          if(novel.title.toUpperCase().indexOf(userTitle.trim().toUpperCase())!=-1){
              return novel;
          }
      });
      return filteredNovelsByTitle;
  }
  $("#sort").on("change", filterChange);
$("#searchTitles").on("keyup",filterChange);
  $("#priceRange").on("change",filterChange);
  function filterByPriceRange(novels){
    var userTopPrice = $("#priceRange").val();
   var novelsInRange = novels.filter(function(novel){
      if(novel.price<=userTopPrice){
        return novel;
      }
    });
    return novelsInRange;
  }

  function filterBySubgenres(novels){
var selectedSubgenres=[];
$(".subgenres:checked").each(function(item){
  selectedSubgenres.push($(this).val());
  });

if(selectedSubgenres.length !=0){
  return novels.filter(novel=>selectedSubgenres.includes(novel.subgenre));
}
     return novels;
  }

  function filterByAuthors(novels){
var selectedAuthors=[];
$(".authors:checked").each(function(item){
  selectedAuthors.push($(this).val());
  });

if(selectedAuthors.length !=0){
  return novels.filter(novel=>selectedAuthors.includes(novel.author));
}
     return novels;
  }
  function filterByPublishingHouses(novels){
var selectedPublishingHouses=[];
$(".publishingHouses:checked").each(function(item){
  selectedPublishingHouses.push($(this).val());
  });

if(selectedPublishingHouses.length !=0){
  return novels.filter(novel=>selectedPublishingHouses.includes(novel.publishingInformation.publishingHouse));
}
     return novels;
  }
  function filterByAvailabilities(novels){
var selectedAvailability=[];
$(".availability:checked").each(function(item){
  selectedAvailability.push($(this).val());
  });

if(selectedAvailability.length !=0){
  return novels.filter(novel=>selectedAvailability.includes(novel.availability));
}
     return novels;
  }



  $("#priceRange").on("input",function(){
    $("#topLine").html($(this).val());
  });

}


if (window.location == "https://markostojanovic4419thegreatestgift.github.io/comedyNovels.html"){
  getViaAjax("comedySubgenres", showSubgenres);
  getViaAjax("comedyAuthors", showAuthors);
  getViaAjax("comedyNovels", showNovels);
  getViaAjax("comedyNovels", getNovels);
}
if (window.location == "https://markostojanovic4419thegreatestgift.github.io/dramaNovels.html"){
  getViaAjax("dramaSubgenres", showSubgenres);
  getViaAjax("dramaAuthors", showAuthors);
  getViaAjax("dramaNovels", showNovels);
  getViaAjax("dramaNovels", getNovels);
}
if (window.location == "https://markostojanovic4419thegreatestgift.github.io/cart.html"){
  getViaAjax("comedyNovels",getComedyNovels);
  getViaAjax("dramaNovels",getDramaNovels);
  var globalNovels;
  var comedyNovels=[];
  var dramaNovels=[];
  function getComedyNovels(novels){
        comedyNovels=novels;
  }
  function getDramaNovels(novels){

      dramaNovels=novels;
  }
setTimeout(() => {
  globalNovels=comedyNovels.concat(dramaNovels);
readingAllNovels(globalNovels);
readingNovelsFromCart(globalNovels);
}, 100);
  
  function readingNovelsFromCart(novels){
    emptyCart();
    var cartBlock = document.getElementById("cartBlock");
    if(!localStorage.getItem("novelsToBuy")){
      cartBlock.innerHTML=`<div class="width100 displayFlex justifyContentCenter blockPaddingTop"><h4 class="redColor">Your cart is empty!</h4></div>`;
    }
    else {
      var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
      var novelsInCart = [];
      novelsInCartLocalStorage.forEach(novel=>{
        novelsInCart.push(parseInt(novel.id));
      });
      var showNovels = novels.filter(novel=>novelsInCart.includes(novel.id));
      showNovelsFromCart(showNovels);
    }
  }
  function showNovelsFromCart(novels){
    emptyCart();
    var writingNovels = "";
    var cartBlock = document.getElementById("cartBlock");
    writingNovels="<div class='displayFlex justifyContentSpaceBetween tabletFlexDirectionColumn tabletBlockPaddingTop tabletAlignItemsCenter'><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Image</h5></div><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Title</h5></div><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Unit price</h5></div><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Quantity</h5></div><div class='width15 tabletWidth45 textAlignCenter'><h5 class='redColor'>Quantity management</h5></div></div>";
    novels.forEach(novel=>{
      writingNovels+=`
                <div class='displayFlex justifyContentSpaceBetween tabletFlexDirectionColumn tabletAlignItemsCenter'><div class='width15 tabletWidth45'><img class="borderRadius descriptiveImage" src="${novel.image.src}" alt="${novel.image.alt}"/></div><div class='width15 tabletWidth45 textAlignCenter'><h6 class='redColor'>${novel.title}</h6></div><div class='width15 tabletWidth45 textAlignCenter'><h6 class='redColor'>$${novel.price}</h6></div><div id="quantityOf${novel.id}" class='width15 tabletWidth45 textAlignCenter'><h6 class="redColor">${quantityOfANovel(novel.id)}</h6></div><div class='width15 displayFlex flexDirectionColumn tabletWidth45'><button type="button" class="addMore redBackgroundColor whiteColor borderRadius tinyMarginBottom tinyPadding" data-id="${novel.id}"><span class="fa fa-plus" aria-hidden="true"></span></button><button type="button" class="removeMore tinyPadding redBackgroundColor whiteColor borderRadius tinyMarginBottom" data-id="${novel.id}"><span class="fa fa-minus" aria-hidden="true"></span></button><button type="button" class="removeAll tinyPadding redBackgroundColor whiteColor borderRadius tinyMarginBottom" class="removeAll width100" data-id="${novel.id}"><span class="fa fa-trash" aria-hidden="true"></span></button></div></div>
      `;
    });
    writingNovels+=`<div class="width100 displayFlex justifyContentCenter tinyMarginTop"><h5 class='redColor'>Totally to pay: $${totalPriceOfNovels(novels)}</h5></div>`;
    cartBlock.innerHTML=writingNovels;
    $(".addMore").click(addANovel);
    $(".removeMore").click(removeANovel);
    $(".removeAll").click(removeAllSameNovels);
  }
  function quantityOfANovel(novelId){
    emptyCart();
    var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
    var quantity = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
    return quantity[0].quantity;
}
function totalPriceOfNovels(novels){
  var totalPrice = 0;
  novels.forEach(novel=>{
    totalPrice+=novel.price*quantityOfANovel(novel.id);
  })
  return totalPrice.toFixed(2);
}
function addANovel(e){
  e.preventDefault();
  var novelId = this.dataset.id;
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  var novel = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
  novel[0].quantity++;
  localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
  refreshQuantity(novelId);
  checkQuantity(novelId);
  readingNovelsFromCart(allNovels);
  numberOfNovelsInCart();
}
function removeANovel(e){
  e.preventDefault();
  var novelId = this.dataset.id;
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  var novel = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
  novel[0].quantity--;
  localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
  refreshQuantity(novelId);
  checkQuantity(novelId);
  readingNovelsFromCart(allNovels);
  emptyCart();
  numberOfNovelsInCart();
}
function removeAllSameNovels(e){
  e.preventDefault();
  var index;
  var novelId = this.dataset.id;
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  for(var i in novelsInCartLocalStorage){
    if(novelsInCartLocalStorage[i].id==novelId){
      index = i;
    }
  }
  novelsInCartLocalStorage.splice(index,1);
  localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
  emptyCart();
  readingNovelsFromCart(allNovels);
 
  numberOfNovelsInCart();
}
function readingAllNovels(novels){
  allNovels= novels;
}
function checkQuantity(novelId){
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  var novel = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
  var quantity = novel[0].quantity;
  var indexOfNovel = 0;
  if(quantity == 0){
    for (var i in novelsInCartLocalStorage){
      if(novelsInCartLocalStorage[i].id==novelId){
        indexOfNovel = i;
      }
    }
    novelsInCartLocalStorage.splice(indexOfNovel,1);
    localStorage.setItem("novelsToBuy",JSON.stringify(novelsInCartLocalStorage));
    emptyCart();
  }
 
  numberOfNovelsInCart();
}
function refreshQuantity(novelId){
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  var novel = novelsInCartLocalStorage.filter(novel=>novel.id==novelId);
  document.getElementById(`quantityOf${novelId}`).innerHTML=novel[0].quantity;
  emptyCart();
  numberOfNovelsInCart();
}
function emptyCart(){
  var novelsInCartLocalStorage=JSON.parse(localStorage.getItem("novelsToBuy"));
  if(novelsInCartLocalStorage==null || novelsInCartLocalStorage.length==0){
    localStorage.removeItem("novelsToBuy");
  }
}
$("#cartBlock").on("mouseover", ".descriptiveImage", function () {
  $(this).addClass("descriptiveImageBoxShadow");
});
$("#cartBlock").on("mouseleave", ".descriptiveImage", function () {
  $(this).removeClass("descriptiveImageBoxShadow");
});
}
