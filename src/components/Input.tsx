    import clsx from "clsx"
    interface InputProps{

        type:string,
        placeholder:string,
        value:string,
        onChange?:(e:any)=>void,
        className?:string
        required?:boolean

    }

    export default function Input({className="",type="text",placeholder="",value="",required,onChange=()=>{}}:InputProps){



        return <>

        <input
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx('border-1 p-2 rounded-lg mr-2 border-slate-300',className)}
        />
        </>
    }