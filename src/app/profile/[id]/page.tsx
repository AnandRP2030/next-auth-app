// whatever value i enter after /profile/ will be stored in params
// /params/abc => // params.id = abc
// /params/123 => // params.id = 123

export default function ProfilePage ({params}: any) {
    console.log('par', params)
    return (
        <div>
            <h1>Profile {params.id} </h1>
        </div>
    )
}