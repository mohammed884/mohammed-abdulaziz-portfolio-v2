import axios from "axios";
const { NEXT_PUBLIC_API_URL } = process.env
export const getProjects = async () => {
    console.log(NEXT_PUBLIC_API_URL);
    const url = `${NEXT_PUBLIC_API_URL}/projects`;
    const { data } = await axios(url);
    return data
}
export const getProjectDetails = async title => {
    const url = `${NEXT_PUBLIC_API_URL}/projects/details`
    const { data } = await axios(url, { headers: { title } });
    return data
}
export const getReviews = async () => {
    const url = `${NEXT_PUBLIC_API_URL}/review`
    const { data } = await axios(url);
    console.log(data);
    return data
}
export const getRole = async token => {
    if (token === "") false
    const url = `${NEXT_PUBLIC_API_URL}/admin`
    const { data } = await axios(url, { headers: { token } });
    return data.success
};

export const getAnsweredClients = async token => {
    if (token === "") return { success: false }
    const url = `${NEXT_PUBLIC_API_URL}/clients/answered`
    const { data } = await axios(url, { headers: { token } });
    return data
}
export const getPotentialClients = async token => {
    if (token === "") return { success: false }
    const url = `${NEXT_PUBLIC_API_URL}/clients/potential`
    const { data } = await axios(url, { headers: { token } });
    return data
}
export const deleteReview = async (target, _id, isAdmin) => {
    if (!isAdmin) return;
    const isSure = window.confirm('Are you sure you want to DELETE THIS REVIEW?')
    if (!isSure) return
    const { data } = await axios.delete("/api/review", { headers: { _id } });
    if (data.success) target.closest(".review").remove()
}