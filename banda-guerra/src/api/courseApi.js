export async function getCourses() {

    const response = await fetch(
        'http://localhost:8080/courses'
    );

    if (!response.ok) {
        throw new Error('Error al obtener cursos');
    }

    return await response.json();
}