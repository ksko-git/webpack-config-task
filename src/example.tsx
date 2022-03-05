import React from "react";
import './my-sass.scss';

export const TsxTitle = (props: { color: string }) => (
    <div>
        <h1 >Привет, я заголовок с примененным sass стилем 😺</h1>
        <h2 style={{ color: props.color ?? 'black' }} >А я заголовок с примененным стилем из пропсов 😏</h2>
    </div>
);