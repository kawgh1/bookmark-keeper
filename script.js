const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const button = document.getElementById('button');

//
let bookmarks = [];


// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
// if click anywhere else on screen, close modal
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
// close modal on submit
button.addEventListener('click', () => modal.classList.remove('show-modal'));

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


// Build Bookmarks on DOM
function buildBookmarks() {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
}


// Fetch Bookmarks from Local Storage
function fetchBookmarks() {
    // Get bookmarks from local Storage if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }

    else {
        // create bookmarks array in local storage if none found
        bookmarks = [
            {
                name: 'The Weather Channel',
                url: 'https://www.weather.com/'
            },
            {
                name: 'Google',
                url: 'https://www.google.com/'
            },
            {
                name: 'Wired',
                url: 'https://www.wired.com/'
            },
            {
                name: 'BBC',
                url: 'https://www.bbc.com/'
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(url) {

    bookmarks.forEach((bookmark, i) => {

        if (bookmark.url === url) {
            // find item at index i and remove 1 item
            bookmarks.splice(i, 1);
        }
    });

    // Update bookmarks array in localStorage, repopulate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}


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

    // create bookmark
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };

    // add bookmark to bookmarks array[]
    bookmarks.push(bookmark);

    // send to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // fetch bookmarks
    fetchBookmarks();
    // bookmarkForm.reset();
    // websiteNameEl.focus();
    bookmarkForm.close();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);


// On Page Load, Fetch Bookmarks from Local Storage
fetchBookmarks();