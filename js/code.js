let imagesSrc = ['url(../images/bat1.jpg) center', 'url(../images/bat2.jpg) center', 'url(../images/bat3.jpg) center', 'url(../images/bat4.jpg) center', 'url(../images/bat5.jpg) center'],
    introduction = document.querySelector('.introduction'),
    option = document.querySelector('.options'),
    tringel = document.querySelector('.options .tringle'),
    opChange = document.querySelector('.bg-change'),
    opChangeBtn = document.querySelector('.op button')

let colors = Array.from(document.getElementById('colors-list').children);
//- 
let mainColors = localStorage.getItem('main-color');
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);

    colors.forEach(element => {
        element.classList.remove('active');
        if (getComputedStyle(element).backgroundColor === mainColors) {
            element.classList.add('active')
        }
    })
}


//- Open & Close Options Section
tringel.addEventListener('click', function () {
    option.classList.toggle('open');
});

//- Changing Back Ground
let bgOption = true,
    intervalHandel;

function changingBg() {
    if (bgOption === true) {
        intervalHandel = setInterval( function () {
            let randomNumber = Math.round(Math.random() * 4);
                introduction.style.background = imagesSrc[randomNumber];
                introduction.style.backgroundSize = 'cover'
        }, 5000)
    }
}

let stable = document.querySelector('.bg-change .stable');

stable.addEventListener('click', function () {
    this.classList.toggle("active");
    bgOption = false;
    clearInterval(intervalHandel)
})

if (stable.classList.contains('active')) {
    changingBg()
}

//- Colors Settings
colors.forEach(color => {
    color.addEventListener('click', function (e) {
        var mainColor = getComputedStyle(this).backgroundColor,
            localColor = localStorage.setItem('main-color', mainColor);
        document.documentElement.style.setProperty('--main-color', mainColor); //Changing Root Property in css
        handelActive(e)
    });
});


//-- --------- Skills Progress Bars
let skillsSection = document.querySelector('.skills'),
    SkillsProgress = document.querySelectorAll('.skills .skill-progress span');
window.onscroll = function () {
    let pageYScrolled = this.pageYOffset,
        skillsOffset = skillsSection.offsetTop,
        skillsOuterHeight = skillsSection.offsetHeight,
        windowHeight = this.innerHeight;

    if (pageYScrolled >= (skillsOffset + skillsOuterHeight - windowHeight)) {
        SkillsProgress.forEach(skill => {
            skill.style.width = skill.dataset.percent;
        })
    } else{
        SkillsProgress.forEach(skill => {
            skill.style.width = '0%'
        })
    }
}

// -- ------- Movies Gallery
let movies = document.querySelectorAll('.gallery .gallery-list img')

movies.forEach(img => {
    img.addEventListener('click', function () {
        let overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        document.body.appendChild(overlay);
        //-
        let viewImg = document.createElement('img'),
        imgHolder = document.createElement('div');
        imgHolder.className = 'img-holder';
        overlay.appendChild(imgHolder);
        let imgAlternate = document.createElement('h3'),
            altNode = document.createTextNode(img.alt);
        imgAlternate.className = 'img-alt';
        imgAlternate.append(altNode);
        imgHolder.appendChild(imgAlternate);
        viewImg.src = img.src;
        imgHolder.appendChild(viewImg);
        //-

        overlay.onclick = function () {overlay.style.display = 'none'}
    });
})

//-- Trigger Bullets
let bullets = document.querySelectorAll('.bullets .bullet');

bullets.forEach(bullet => {
    bullet.addEventListener('click', (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


//-- Bullets Option 
let bulletsOption = document.querySelectorAll('.options .bullets-buttons button'),
    bulletNo = document.getElementById('bullet-no'),
    bulletYes = document.getElementById('bullet-yes'),
    bulletsLocal = localStorage.getItem('bullets-option');

if (bulletsLocal !== null) {
    if(bulletsLocal === 'none'){
        document.querySelector('.bullets').style.display = 'none';
        bulletsOption.forEach(button => {
            button.classList.remove('active')
        })
        bulletNo.classList.add('active')
    } else{
        document.querySelector('.bullets').style.display = 'inline-block';
    }
}


bulletsOption.forEach(element => {
    element.addEventListener('click', function(e) {
        handelActive(e);
        if(element.dataset.show === 'no'){
            document.querySelector('.bullets').style.display = 'none';
            localStorage.setItem('bullets-option', 'none')
        }
        if(element.dataset.show === 'yes'){
            document.querySelector('.bullets').style.display = 'inline-block';
            localStorage.setItem('bullets-option', 'block')
        }
    })
})


//-- Handel Active Class
function handelActive(ev){
    ev.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
    ev.target.classList.add('active')
}

//-- Clear LocalStorage
document.querySelector('.reset-options .clear').onclick = function() {
    localStorage.clear();
    window.location.reload()
}