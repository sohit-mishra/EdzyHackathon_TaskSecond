export function validateSubjectsByClass(
  classValue: string,
  subjects: string[]
) {
  if (["9", "10"].includes(classValue)) {
    return subjects.length >= 2;
  }
  if (["11", "12"].includes(classValue)) {
    return subjects.length >= 3;
  }
  return true;
}