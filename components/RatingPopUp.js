export default function RatingPopUp({active}) {
    return (
        <div className={`w-[100%] h-[94.7vh] fixed ${!active ? "hidden" : "flex"}`}>
            <div className={`w-[100%] h-[100%] bg-black opacity-50 absolute z-[888888]`}></div>
        </div>
    )
}
