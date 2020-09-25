//i was planning to use scroll events and getboundry and these stuff but,
//i think if there is another way to know the is the section in view or not,
//and i had started searchig tell i found a magnificent object called
//intersection opserver that opserve all time an element intesrsecting with
//viewport and return a boolean value =>"isIntersecting" which i use to 
//interact with the section in view 

//set options for observer
const options = {
    rootMargin: "-15px 0px -900px 0px"
}
//create new observer that takes a function and options

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // get the id of target section
        const id = entry.target.getAttribute('id');
        const navs = document.querySelectorAll(`nav  a[href="#${id}"]`);
        navs.forEach(nav => {
            if (entry.isIntersecting) {
                //styling the nav link that go to section when section intersect
                //with viewport
                nav.parentElement.classList.add('active');
            } else {
                //remove styling the nav link that go to section when section intersect
                //with viewport
                nav.parentElement.classList.remove('active');
            }
        });

    });
}, options);



//some useful functions

//1-add section to document
function addSection(sectionID) {
    // add nav link of section id to nav bar to navigate the this section
    document.querySelector('#nav').insertAdjacentHTML('beforeend', `<div><a href="#${sectionID}">
    <h2>${sectionID}</h2>
</a></div>`);
    //for responsiv nav bar
    document.querySelector('#responsiveNav .menu').insertAdjacentHTML('beforeend', `<div><a href="#${sectionID}">
<h2>${sectionID}</h2>
</a></div>`);

    //i used for adding to document a doument fragment to avoid many times of reflow and repaint
    //and it is better in performance

    //first creat fragment
    const docFrag = document.createDocumentFragment();
    //2nd creat section
    const section = document.createElement('section');
    //3rd add id attribute to section
    section.setAttribute('id', `${sectionID}`);
    //create heading with the innertext same like 'section id'
    const test = document.createElement("h2");
    test.innerText = `${sectionID}`;
    //append h2 fo fragment
    section.appendChild(test);
    //append section fo fragment
    docFrag.appendChild(section);
    //finally add section to the body befor the script tag using inserbefor body.lastChiled which is 
    //script tag
    document.body.insertBefore(docFrag, document.body.lastChild);

}

//add pragraph and image to specific section
//1-add the id section you wanna add content to it
//2-add the content of the paragraph
//3-add the loction of the image you wanna insert
function addContentToSection(SectionId, paragraphContent, imgScource) {

    const docFrag = document.createDocumentFragment();
    const paragraph = document.createElement('p');
    paragraph.innerHTML = `${paragraphContent}`;
    const image = document.createElement('div');
    image.setAttribute('style', `background:url(${imgScource}); height:60%; background-repeat:no-repeat; background-size:cover; margin-top:20px ;background-position:center center`);
    docFrag.append(paragraph, image);
    document.querySelector(`#${SectionId}`).appendChild(docFrag);

}

//remove specific section
function removeSection(sectionID) {

    document.querySelector(`[href='#${sectionID}']`).remove();
    //remove nav link of removed section form nav bar

    const sectionToBeRemoved = document.getElementById(`${sectionID}`);
    document.body.removeChild(sectionToBeRemoved);
}

//fuction to open hamburgar menue
function openHamb() {
    const hambMenu = document.getElementById('hambMenu')
    hambMenu.classList.toggle("activehamb");
    const lines = document.querySelectorAll('#line');
    lines[0].classList.toggle("line1");
    lines[1].classList.toggle("line2");
    lines[2].classList.toggle("line3");
}
//click hamb icon to open hamb menue
function listenForClicKOnHambIcon() {
    document.getElementById('hambIcon').addEventListener('click', openHamb)
}

//for resize event to check whin the window resize to mob view
function resposiveWithResize() {
    checkForSizeOfScreen();
}

function checkForSizeOfScreen() {
    const navBar = document.querySelector('#nav');
    const resnavBar = document.querySelector('#responsiveNav');

    const windowWidth = window.innerWidth;
    if (windowWidth <= 850) {
        navBar.style.display = 'none';
        resnavBar.style.display = 'flex'

    } else {
        navBar.style.display = 'flex';
        resnavBar.style.display = 'none'
    }
}
//calling area

//test add section
addSection("test6");
addSection("test7");

//test add content to section
addContentToSection("test6", "ahmed tolan fullstack developer", "../assets/pic.jpg");
addContentToSection("test7", "ahmed tolan landing project", "../assets/pic.jpg");
//test remove
//removeSection('test4');


// select all sections and Track all sections that have an `id` applied
//allert => this function must called in the last so that the observer can style all added nav links
const sections = document.querySelectorAll('section');
sections.forEach((section) => {
    observer.observe(section);
});

//litten for resize event
window.addEventListener('resize', resposiveWithResize);

//check if the device screen is ready for redisign the nav bar when page loded instancly 
checkForSizeOfScreen();

//listen a click on humburgar icon
listenForClicKOnHambIcon();