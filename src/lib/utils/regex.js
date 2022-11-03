const passwordRegex = {
    total: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,32}$)/,
    length: /^.{6,32}$/,
    chars: /((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))/
};

export const namePattern = "^[A-ZÀ-ÿ][a-zà-ÿ]{1,31}$";
export const lastnamePattern = "^[A-Zà-ÿ]{2,32}$";
export const fieldPattern = "^[a-z0-9]{2,32}$";
export const passwordPattern = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))).{6,32}$";

export function isName(name) {
    return /^[A-ZÀ-ÿ][a-zà-ÿ]{1,31}$/.test(name);
}

export function isLastname(lastname) {
    return /^[A-Zà-ÿ]{2,32}$/.test(lastname);
}

export function isField(field) {
    return /^[a-z0-9]{2,32}$/.test(field);
}

export function isPassword(password) {
    return passwordRegex.total.test(password);
}

export function handleNameInput(e) {
    if (!e.target.value) return;
    e.target.value = (e.target.value[0].toUpperCase() + e.target.value.slice(1).toLowerCase()).replace(/[^a-zA-ZÀ-ÿ]/g, "");
}

export function handleLastnameInput(e) {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-ZÀ-ÿ]/g, "");
}

export function handleFieldInput(e) {
    e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getPasswordErros(password) {
    const errors = [];
    if (!passwordRegex.length.test(password)) errors.push("Entre 6 et 32 caractères.");
    if (!passwordRegex.chars.test(password)) errors.push("Au moins deux des caractères: chiffre, lettre minuscule, lettre majuscule.");
    return errors;
}