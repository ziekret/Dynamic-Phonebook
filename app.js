const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
let contacts = [];

if (localStorage.getItem('contacts')) {
    contacts = JSON.parse(localStorage.getItem('contacts'));
    renderContacts();
}


function isDuplicate(newContact) {
    return contacts.some(contact =>
        contact.fullName === newContact.fullName &&
        contact.address === newContact.address &&
        contact.cellNumber === newContact.cellNumber &&
        contact.phoneNumber === newContact.phoneNumber &&
        contact.email === newContact.email
    );
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const cellNumber = document.getElementById('cellNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    const newContact = { fullName, address, cellNumber, phoneNumber, email };


    if (isDuplicate(newContact)) {
        const confirmDuplicate = confirm("You have inputted duplicate information. Are you sure you want to proceed?");
        if (!confirmDuplicate) {
            return; 
        }
    }


    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));


    contactForm.reset();


    renderContacts();
});


function renderContacts() {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${contact.fullName}</td>
            <td>${contact.address}</td>
            <td>${contact.cellNumber}</td>
            <td>${contact.phoneNumber}</td>
            <td>${contact.email}</td>
            <td>
                <button class="edit" onclick="editContact(${index})">Edit</button>
                <button class="delete" onclick="deleteContact(${index})">Delete</button>
            </td>
        `;
        contactList.appendChild(row);
    });
}

window.deleteContact = (index) => {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
};

window.editContact = (index) => {

    const contact = contacts[index];

    document.getElementById('fullName').value = contact.fullName;
    document.getElementById('address').value = contact.address;
    document.getElementById('cellNumber').value = contact.cellNumber;
    document.getElementById('phoneNumber').value = contact.phoneNumber;
    document.getElementById('email').value = contact.email;

    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
};
