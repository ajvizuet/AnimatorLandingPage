
(function(){
    emailjs.init({
      publicKey: "RDoT2L7AmFR7Ojf4U",
    });
 })();

const illustrations = ['1.png', '2.png', '3.png'];
const paintings = ['4.jpg', '5.jpg'];

function showMenu() {
    const overlay = document.getElementById('overlay-menu');
    const dropdownIcon = document.getElementById('dropdown-icon');
    const nav = document.getElementById('nav-menu');
    nav.classList.add('show-nav');
    dropdownIcon.style.display = 'none';
    overlay.style.display = 'block'
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    const overlay = document.getElementById('overlay-menu');
    const dropdownIcon = document.getElementById('dropdown-icon');
    const nav = document.getElementById('nav-menu');
    nav.classList.remove('show-nav');
    dropdownIcon.style.display = 'block';
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
    const textElements = document.querySelectorAll('.init-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }else {
                entry.target.classList.remove('in-view');
            }
        }, { threshold: 0.5 });
    });
    textElements.forEach((element) => {
        observer.observe(element);
    });
});

function showPreview(imageSrc) {
    console.log(imageSrc);
    const previewModal = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');

    previewImage.src = imageSrc;
    previewModal.style.display = 'flex';
    setTimeout(() => {
        previewImage.classList.add('grow');
        document.body.style.overflow = 'hidden';
    }, 10);
}

function closePreview() {
    const previewModal = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    previewImage.classList.remove('grow');
    setTimeout(() => {
        previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function sendEmail() {
    const name = document.getElementById('nameTxt');
    const email = document.getElementById('emailTxt');
    const message = document.getElementById('messageTxt');
    console.log(name.value + ' ' + email.value + ' ' + message.value);

    emailjs.send('service_s8z6qug', 'template_m3bn6px', {
        sender: email.value+'',
        from_name:  name.value+'',
        message: message.value+'',
    })
    .then(function(response) {
        console.log('Email sent!');
        document.getElementById('nameTxt').value = '';
        document.getElementById('emailTxt').value = '';
        document.getElementById('messageTxt').value = '';
    }, function(error) {
        console.log('Failed');
    });
}

function fillGallery() {
    const galleryI = document.getElementById('gallery-i');
    const galleryP = document.getElementById('gallery-p');
    illustrations.forEach(image => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('gallery-item');
        imageDiv.classList.add('clickable-image');
        const imageUrl = "url('img/gallery/illustrations/" + image + "')";
        console.log(imageUrl);
        imageDiv.style.backgroundImage = imageUrl;
        imageDiv.addEventListener('click', () => {
            showPreview("img/gallery/illustrations/" + image);
        });
        galleryI.appendChild(imageDiv);
    })
    paintings.forEach(image => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('gallery-item');
        imageDiv.classList.add('clickable-image');
        const imageUrl = "url('img/gallery/paintings/" + image + "')";
        console.log(imageUrl);
        imageDiv.style.backgroundImage = imageUrl;
        imageDiv.addEventListener('click', () => {
            showPreview("img/gallery/paintings/" + image);
        });
        galleryP.appendChild(imageDiv);
    })

}

function openOptions() {
    const options = document.getElementById('portfolioOptions');
    if(options.style.display != 'flex') {
        options.style.display = 'flex';
        setTimeout(() => {
            options.style.transform = 'translateY(0)';
            options.style.opacity = '1';
        }, 50);
    }
}

document.addEventListener('DOMContentLoaded', fillGallery);
document.addEventListener('DOMContentLoaded', () => {
    const portfolioSelect = document.getElementById('portfolioSelect');

    portfolioSelect.addEventListener('mouseover', openOptions);
    portfolioSelect.addEventListener('click', openOptions);
    
    portfolioSelect.addEventListener('mouseleave', () => {
        const options = document.getElementById('portfolioOptions');
        options.style.transform = 'translateY(-40%)';
        options.style.opacity = '0';
        setTimeout(() => {
            options.style.display = 'none';
        }, 250);
    });
});
