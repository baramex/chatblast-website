export function isName(name) {
    return /^[A-ZÀ-ÿ][a-zà-ÿ]{1,31}$/.test(name);
}

export function isLastname(lastname) {
    return /^[A-Zà-ÿ]{1,32}$/.test(lastname);
}

export function isField(field) {
    return /^[a-z0-9]{1,32}$/.test(field);
}

export function handleNameChange(e) {
    if (!e.target.value) return;
    e.target.value = (e.target.value[0].toUpperCase() + e.target.value.slice(1).toLowerCase()).replace(/[^a-zA-ZÀ-ÿ]/g, "");
}

export function handleLastnameChange(e) {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-ZÀ-ÿ]/g, "");
}

export function handleFieldChange(e) {
    e.target.value = e.target.value.replace(/[^a-z0-9]/g, "");
}