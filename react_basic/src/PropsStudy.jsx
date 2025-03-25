// 현재 props는 { hello: "world", mynum: 100, obj: [1, 2,3]}
function PropsStudy(props) {
    const o = { a: 100 }

    return <div>
        {props.hello} {props.mynum} {props.obj} 
        {JSON.stringify(o)} {o.a}
    </div>
}

export default PropsStudy