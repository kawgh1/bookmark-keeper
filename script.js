const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);

modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));

// Validate Form
function validate(nameValue, urlValue) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

    const regex = new RegExp(expression);

    if (!nameValue || !urlValue) {
        alert('Please include values for both fields.')
        return false;
    }

    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address.');
        return false;
    }

    // Valid
    return true;
}

// close modal on click anywhere on screen
window.addEventListener('click', (event) => (event.target === modal ?
    modal.classList.remove('show-modal') : false));


// Handle Data from Form
function storeBookmark(e) {
    e.preventDefault(); // prevent submit from trying to submit to webserver, just stay local to page
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;

    if (!urlValue.includes('http://', 'https://')) {

        urlValue = `https://${urlValue}`;

    }

    // Validate
    if (!validate(nameValue, urlValue)) {
        return false;
    }
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);