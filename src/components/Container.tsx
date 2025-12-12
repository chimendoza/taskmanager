
interface ContainerProps{

    title:string,
    children:React.ReactElement

}

export default function({children,title=""}:ContainerProps){

    return <div className="bg-white p-10 w-full ml-auto block">
            <h3 className="text-lg font-bold mb-10">{title}</h3>
                {children}
            </div>

}