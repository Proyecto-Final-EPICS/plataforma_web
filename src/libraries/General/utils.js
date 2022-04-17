
// https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
export function getAgeFromBirthDate(birthDate) {
    const today = new Date();
    birthDate = new Date(birthDate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    return age;
}
