import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper } from 'swiper';
import SplitType from 'split-type';

// Register ScrollTrigger with gsap
gsap.registerPlugin(ScrollTrigger);

// Create shorthands
var Sc = ScrollTrigger;
var Qe = gsap;


(() => {

    var vimeoModal = () => {
        const videoItems = document.querySelectorAll(".gl-video-item"),
          modalContainer = document.querySelector(".gl-video-modal"),
          iframe = document.querySelector("#gl-modal"),
          modalBackdrop = document.querySelector(".gl-modal-backdrop");
          if (!iframe) {
            console.log("Iframe not found on the page");
            return;
          }
        let vplayer = null;
    
        videoItems.forEach((videoItem) => {
          videoItem.addEventListener("click", () => {
            const dataVideo = videoItem.getAttribute("data-player");
            iframe.src = `https://player.vimeo.com/video/${dataVideo}?autoplay=1&muted=0`;
    
            vplayer = new Vimeo.Player(iframe);
            vplayer.ready().then(() => {
              vplayer.play();
            });
    
            modalContainer.classList.add("-open");
            opened = true;
          });
        });
    
        modalBackdrop.onclick = function () {
          modalContainer.classList.remove("-open");
          opened = false;
          if (vplayer) {
            vplayer
              .pause()
              .then(() => {
                iframe.src = "";
              })
              .catch((error) => {
                console.error("Error pausing the video", error);
              });
          }
        };
      };

      var reelerX = function () {

        const marquee = document.querySelectorAll(".gl-marquee");
        if (!marquee) {
            console.log("No marquee not found on the page");
            return;
          }

            marquee.forEach((e) => {
            const items = e.querySelector(".gl-marquee-items"),
                item = e.querySelectorAll(".gl-marquee-item");

            e.classList.add("swiper-container");
            items.classList.add("swiper-wrapper");
            item.forEach((e) => e.classList.add("swiper-slide"));

            const slider = new Swiper(e, {
                slidesPerView: "auto",
                loop: false,
                // Adding navigation options
                navigation: {
                nextEl: ".gl-swipe-button.next", // Specify the class for the next button
                prevEl: ".gl-swipe-button.back", // Specify the class for the previous button
                },
                breakpoints: {
                991: {
                    slidesPerView: "auto",
                },
                },
            });
            });

            const fleet = document.querySelectorAll(".gl-fleet");

            fleet.forEach((e) => {
            const items = e.querySelector(".gl-fleet-items"),
                item = e.querySelectorAll(".gl-fleet-item");

            e.classList.add("swiper-container");
            items.classList.add("swiper-wrapper");
            item.forEach((e) => e.classList.add("swiper-slide"));

            const slider = new Swiper(e, {
                loop: true,
                centeredSlides: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 300,
                spaceBetween: 50,
                autoplay: {
                delay: 2500,
                disableOnInteraction: true,
                },
                // Adding navigation options
                navigation: {
                nextEl: ".gl-fleet-button.next", // Specify the class for the next button
                prevEl: ".gl-fleet-button.back", // Specify the class for the previous button
                },
                breakpoints: {
                150: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },

                991: {
                    slidesPerView: 3,
                },
                },
            });
         });

      };

      var faqAccord = function () {
            let groups = gsap.utils.toArray(".faq-menu");
            let menus = gsap.utils.toArray(".faq-item");
            let menuToggles = [];

            if (!groups) {
                console.log("FAQ not found on the page");
                return;
              }

            let activeMenu = null; // Keep track of the active menu

            menus.forEach((menu) => {
            let animation = createAnimation(menu);
            menuToggles.push(animation);

            menu.addEventListener("click", () => toggleMenu(animation));
            });

            function toggleMenu(animation) {
            if (activeMenu !== animation) {
                if (activeMenu) {
                activeMenu.reverse(); // Close the previously open menu
                }
                animation.play(); // Open the clicked menu
                activeMenu = animation;
            } else {
                animation.reverse(); // Close the clicked menu
                activeMenu = null;
            }
            }

            function createAnimation(menu) {
            let element = menu.parentElement;
            let box = element.querySelector(".answer");
            let plusSign = element.querySelector(".plus");
            let cardBack = element.querySelector(".faq-item");
            let questionText = element.querySelector(".question");

            gsap.set(box, { height: "auto" });
            gsap.set(questionText, { marginLeft: "2vw" });

            let timeline = gsap
                .timeline({ paused: true })
                .from(box, {
                height: 0,
                duration: 0.5,
                ease: "power1.inOut",
                })
                .from(
                questionText,
                {
                    marginLeft: 0,
                    duration: 0.5,
                    ease: "power4.inOut",
                },
                "<"
                )
                .to(
                plusSign,
                {
                    rotate: "45deg",
                    duration: 0.1,
                    ease: "power1.inOut",
                },
                "<"
                )
                .reverse();

            return timeline;
            }
        };


    window.addEventListener("DOMContentLoaded", function () {

        vimeoModal(), reelerX(), faqAccord();

        setTimeout(() => {
            $("[gl-text]").each(function (index) {
              let textEl = $(this).find('[data-split="line"]');
              let btn = $(this).find("a");
              Qe.set(textEl, { autoAlpha: 1, willChange: "transform" });
              let textContent = $(this).text();
              let tl;
        
              function splitText() {
                new SplitType(textEl, { types: "words", tagName: "span" });
                textEl.find(".word").each(function (index) {
                  let lineContent = $(this).html();
                  $(this).html("");
                  $(this).append(
                    `<span class="line-inner" style="display: block;">${lineContent}</span>`
                  );
                });
                tl = Qe.timeline({
                  scrollTrigger: {
                    trigger: textEl,
                    start: "top bottom",
                    end: "bottom bottom",
                    toggleActions: "play none none none",
                  },
                });
                tl.fromTo(
                  textEl.find(".line-inner"),
                  { yPercent: 100, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: { amount: 0.3, ease: "power4.out" },
                  }
                );
                tl.fromTo(
                  btn,
                  { yPercent: 100, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: { amount: 0.3, ease: "power4.out" },
                  },
                  0.3
                );
              }
              splitText();
        
              let windowWidth = window.innerWidth;
              window.addEventListener("resize", function () {
                if (windowWidth !== window.innerWidth) {
                  windowWidth = window.innerWidth;
                  tl.kill();
                  textEl.text(textContent);
                  splitText();
                }
              });
            });
          }, 700);
        
          $(".gl-hero-start").each(function (index) {
            let textEl = $(this).find('[data-split="line"]');
            let btn = $(this).find("a");
            let logos = $(this).find(".gl-card-logo");
            let popup = document.querySelector(".gl-pop-up-top");
            Qe.set(textEl, { autoAlpha: 1 });
            Qe.set(logos, { autoAlpha: 1 });
            let tl;
        
            function heroIn() {
              new SplitType(textEl, { types: "words", tagName: "span" });
              textEl.find(".word").each(function (index) {
                let lineContent = $(this).html();
                $(this).html("");
                $(this).append(
                  `<span class="line-inner" style="display: block;">${lineContent}</span>`
                );
              });
              tl = Qe.timeline({
                scrollTrigger: {
                  trigger: textEl,
                  start: "top bottom",
                  end: "bottom bottom",
                  toggleActions: "none play none reset",
                },
              });
              tl.fromTo(
                textEl.find(".line-inner"),
                { yPercent: 100, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.7,
                  stagger: { amount: 0.3, ease: "power4.out" },
                },
                0
              );
              tl.to(
                ".gl-picture-clip",
                {
                  duration: 1,
                  ease: "power2.out",
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 0)",
                },
                0.3
              );
              tl.fromTo(
                btn,
                { yPercent: 100, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.7,
                  stagger: { amount: 0.3, ease: "power4.out" },
                },
                0.2
              );
              tl.fromTo(
                logos,
                { autoAlpha: 0 },
                {
                  autoAlpha: 1,
                  duration: 0.7,
                  stagger: { amount: 0.5, from: "random" },
                },
                1
              );
              tl.fromTo(
                popup,
                { autoAlpha: 0, yPercent: 2 },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  ease: "power4.out",
                  duration: 0.5,
                },
                1.5
              );
            }
            heroIn();
          });
        
          $("[data-btn='wrap']").each(function () {
            const clipEl = $(this).find("[data-btn='clip']").attr("aria-hidden", "true");
            const durationSetting = 0.4;
            const easeSetting = "power2.out";
          
            function getPercentTop(el, e) {
              let elTop = el.offset().top - $(window).scrollTop();
              let mouseTop = e.pageY - $(window).scrollTop() - elTop;
              return (mouseTop / el.innerHeight()) * 100;
            }
            function getPercentLeft(el, e) {
              let elLeft = el.offset().left;
              let mouseLeft = e.pageX - elLeft;
              return (mouseLeft / el.innerWidth()) * 100;
            }
            $(this).on("mouseenter", function (e) {
              let percentTop = getPercentTop($(this), e);
              let percentLeft = getPercentLeft($(this), e);
              gsap.set(clipEl, { display: "flex" });
              gsap.fromTo(
                clipEl,
                { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` },
                {
                  clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
                  duration: durationSetting,
                  ease: easeSetting,
                }
              );
            });
            $(this).on("mouseleave", function (e) {
              let percentTop = getPercentTop($(this), e);
              let percentLeft = getPercentLeft($(this), e);
              gsap.to(clipEl, {
                clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
                overwrite: true,
                duration: durationSetting,
                ease: easeSetting,
              });
            });
          });

          const cards = document.querySelectorAll("[data-card]");

            cards.forEach((e) => {
            const card = e.querySelectorAll("[data-card=box]"),
                title = e.querySelectorAll("[data-card=text]");

            gsap.set(card, { autoAlpha: 1 });
            gsap.set(title, { autoAlpha: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: e,
                start: "top bottom",
                toggleActions: "play none none none",
                },
            });

            tl.fromTo(
                card,
                {
                y: 50,
                opacity: 0,
                },
                {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                duration: 1,
                stagger: { amount: 0.2 },
                },
                0
            );
            tl.fromTo(
                title,
                {
                y: 100,
                opacity: 0,
                },
                {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: { amount: 0.2 },
                ease: "power2.out",
                },
                0.4
            );
            });

            // card img parallax //

            document.querySelectorAll(".gl-card-feature").forEach((e) => {
            const t = e.querySelector("picture");

            // Set initial properties
            gsap.set(t, { yPercent: -10, scale: 1.05, willChange: "transform" });

            // Create a GSAP timeline with ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: e,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.4,
                },
            });

            tl.fromTo(t, { yPercent: -10 }, { yPercent: 10, scale: 1.05, ease: "none" });
            });

            // stagger in mutliple cards / blocks //

            document.querySelectorAll(".gl-item-i").forEach((e) => {
            // Select all target elements within this container
            const t = e.querySelectorAll(".gl-item");

            // Set initial properties for all targets
            gsap.set(t, {
                yPercent: 10,
                autoAlpha: 0,
                willChange: "transform, opacity",
            });

            // Create a GSAP timeline with a shared ScrollTrigger for all targets
            gsap.timeline({
                scrollTrigger: {
                    trigger: e,
                    start: "top 90%",
                    end: "bottom top",
                    toggleActions: "play none none none",
                },
                })
                .to(t, {
                yPercent: 0,
                autoAlpha: 1,
                ease: "Power2.out",
                duration: 1,
                // Apply stagger here for the group of targets
                stagger: 0.2,
                });
            });

            document.querySelectorAll(".gl-item-ilogo").forEach((e) => {
            // Select all target elements within this container
            const t = e.querySelectorAll(".gl-logo-card");

            // Set initial properties for all targets
            gsap.set(t, {
                yPercent: 2,
                autoAlpha: 0,
                willChange: "transform, opacity",
            });

            // Create a GSAP timeline with a shared ScrollTrigger for all targets
            gsap.timeline({
                scrollTrigger: {
                    trigger: e,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play none none none",
                },
                })
                .to(t, {
                yPercent: 0,
                autoAlpha: 1,
                ease: "Power4.out",
                duration: 1,
                // Apply stagger here for the group of targets
                stagger: { amount: 1, from: "random" },
                });
            });


            const forms = document.querySelectorAll(".gl-get-quote");

                forms.forEach((form) => {
                const addButton = form.querySelector('[data-form-quote="add-item"]');
                const removeButton = form.querySelector('[data-form-quote="remove-item"]');
                const parcelContainer = form.querySelector(".parcel-container");

                addButton.addEventListener("click", function (event) {
                    event.preventDefault();
                    addParcelItem(parcelContainer, removeButton);
                });

                removeButton.addEventListener("click", function (event) {
                    event.preventDefault();
                    removeParcelItem(parcelContainer, removeButton);
                });

                function addParcelItem(parcelContainer, removeButton) {
                    const parcelItem = parcelContainer
                    .querySelector('[data-form-quote="item"]')
                    .cloneNode(true);
                    parcelContainer.appendChild(parcelItem);
                    updateRemoveButtonVisibility(parcelContainer, removeButton);
                }

                function removeParcelItem(parcelContainer, removeButton) {
                    const parcelItems = parcelContainer.querySelectorAll(
                    '[data-form-quote="item"]'
                    );
                    if (parcelItems.length > 1) {
                    parcelContainer.removeChild(parcelItems[parcelItems.length - 1]);
                    }
                    updateRemoveButtonVisibility(parcelContainer, removeButton);
                }

                function updateRemoveButtonVisibility(parcelContainer, removeButton) {
                    const parcelItems = parcelContainer.querySelectorAll(
                    '[data-form-quote="item"]'
                    );
                    if (parcelItems.length <= 1) {
                    removeButton.style.display = "none";
                    } else {
                    removeButton.style.display = "inline-flex";
                    }
                }

                // Initial call to set the correct visibility of the remove button on page load
                updateRemoveButtonVisibility(parcelContainer, removeButton);
                });


                let typeSplit = new SplitType(".h-swap", {
                    types: "words",
                    tagName: "span",
                  });
                  
                  $("[c-w]").each(function (index) {
                    let headings = $(this).find(".h-swap");
                  
                    let tl = gsap.timeline({ repeat: -1 });
                    tl.set(headings, { autoAlpha: 1 });
                    headings.each(function (index) {
                      if (index > 0) {
                        tl.from(
                          $(this).find(".word"),
                          {
                            yPercent: 120,
                            stagger: { amount: 0.2 },
                            duration: 1,
                            ease: "power4.inOut",
                          },
                          "<0.2"
                        );
                      }
                      if (index < headings.length - 1) {
                        tl.to(
                          $(this).find(".word"),
                          {
                            delay: 1,
                            yPercent: -120,
                            stagger: { amount: 0.2 },
                            duration: 1,
                            ease: "power4.inOut",
                          },
                          ">.75"
                        );
                      }
                    });
                  });
                  
                  $("[c-d]").each(function (index) {
                    let headings = $(this).find(".h-swap");
                    let gen = document.querySelector("[data-logo]");
                  
                    let tl = gsap.timeline({ repeat: -1 });
                    tl.set(headings, { autoAlpha: 1 });
                  
                    // Change font color to purple when the first text swap starts
                    // Starts at the beginning of the timeline
                  
                    headings.each(function (index) {
                      if (index > 0) {
                        tl.from(
                          $(this).find(".word"),
                          {
                            yPercent: 120,
                            stagger: { amount: 0.2 },
                            duration: 1,
                            ease: "power4.inOut",
                          },
                          "<0.2"
                        );
                      }
                      if (index < headings.length - 1) {
                        tl.to(
                          $(this).find(".word"),
                          {
                            delay: 1,
                            yPercent: -120,
                            stagger: { amount: 0.2 },
                            duration: 1,
                            ease: "power4.inOut",
                          },
                          ">.75"
                        );
                      }
                    });
                  });
                  
                  $(".counterup").each(function (index) {
                    // assign ID
                    let thisId = "countup" + index;
                    $(this).attr("id", thisId);
                    // create variables
                    let startNumber = +$(this).text();
                    let endNumber = +$(this).attr("final-number");
                    let decimals = 0;
                    let duration = $(this).attr("count-duration");
                    // animate number
                    let myCounter = new CountUp(
                      thisId,
                      startNumber,
                      endNumber,
                      decimals,
                      duration
                    );
                    // Scroll out of view trigger
                    ScrollTrigger.create({
                      trigger: $(this),
                      start: "top bottom",
                      end: "bottom top",
                      onLeaveBack: () => {
                        myCounter.reset();
                      },
                    });
                    // Scroll into view trigger
                    ScrollTrigger.create({
                      trigger: $(this),
                      start: "top 80%",
                      end: "bottom top",
                      onEnter: () => {
                        myCounter.start();
                      },
                    });
                  });
                  
                  // Hero Scroll
                  $(".hero-trigger").on("inview", function (event, isInView) {
                    if (isInView) {
                      let myIndex = $(this).index();
                      $(".hero_heading").removeClass("is--active");
                      $(".hero_heading").eq(myIndex).addClass("is--active");
                    } else {
                      let myIndex = $(this).index();
                      if (myIndex > 0) {
                        $(".hero_heading").removeClass("is--active");
                        $(".hero_heading")
                          .eq(myIndex - 1)
                          .addClass("is--active");
                      }
                    }
                  });
                  
                  $(document).ready(function () {
                    $(".ticker").each(function (index) {
                      // assign ID
                      let thisId = "ticker" + index;
                      $(this).attr("id", thisId);
                      // create variables
                      let startNumber = +$(this).text();
                      let decimals = 0;
                      let options = {
                        useEasing: true,
                        useGrouping: true,
                        separator: ",",
                        decimal: ".",
                      };
                  
                      let myCounter = new CountUp(
                        thisId,
                        startNumber,
                        startNumber,
                        decimals,
                        2,
                        options
                      );
                  
                      if (!myCounter.error) {
                        myCounter.start();
                        // Function to continuously increase the number
                        setInterval(function () {
                          // Generate a random value between 1 and 10
                          let randomIncrement = Math.floor(Math.random() * 10) + 1;
                          myCounter.update(myCounter.endVal + randomIncrement);
                        }, 1500); // Increase by a random value between 1 and 10 every 5 seconds
                      } else {
                        console.error(myCounter.error);
                      }
                    });
                  });
                  
        });
        

        // end of dom contentLoaded //

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
})();


  
  
