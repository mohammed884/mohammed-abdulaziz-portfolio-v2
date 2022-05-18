import axios from "axios";
const { NEXT_PUBLIC_API_URL } = process.env
export const getProjects = async () => {
    const url = `${NEXT_PUBLIC_API_URL}/project`
    const { data } = await axios(url);
    return data
}
export const getProjectDetails = async title => {
    const url = `${NEXT_PUBLIC_API_URL}/project/details`
    const { data } = await axios(url, { headers: { title } });
    return data
}
export const getReviews = async () => {
    const url = `${NEXT_PUBLIC_API_URL}/review`
    const { data } = await axios(url);
    return data
}
export const getRole = async token => {
    const url = `${NEXT_PUBLIC_API_URL}/admin`
    const { data } = await axios(url, { headers: { token } });
    return data.success
};
export const getIsAdminRedirect = async token => {
    const url = `${NEXT_PUBLIC_API_URL}/admin`
    const { data } = await axios(url, { headers: { token } });
    if (!data.success) return {
        redirect: {
            permanent: false,
            destination: "/",
        },
        props: {},
    }
}
export const getAnsweredClients = async () => {
    const url = `${NEXT_PUBLIC_API_URL}/clients/answered`
    const { data } = await axios(url);
    return data
}
export const getPotentialClients = async () => {
    const url = `${NEXT_PUBLIC_API_URL}/clients/potential`
    const { data } = await axios(url);
    return data
}