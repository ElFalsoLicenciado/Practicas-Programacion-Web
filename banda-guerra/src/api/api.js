export const apiFetch = async (
    url,
    options = {}
) => {

    const response = await fetch(url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    });

    if (response.status === 401) {

        console.error(
            'Sesión expirada'
        );
    }

    return response;
};