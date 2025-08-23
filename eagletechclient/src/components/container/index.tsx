import React from "react";
import { JSX } from "react/jsx-runtime";
import './container.css'
import Navbar from "../navbar";

interface Props {
    children: JSX.Element
}

const Container = (props: Props) => {
    return (
        <>
                <Navbar role={sessionStorage.getItem("role")!}/>
            <div className="w-100 bg text-light d-flex justify-content-center flex-column align-items-center" style={{
                height: '90vh'
            }}>
                {props.children}
            </div>
        </>
    )
}

export default Container