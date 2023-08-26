"use client"

export default function Subscription(props: any) {
    return (
      <div>
        Name: {props.Sub.labelName} / Service Name: {props.Sub.serviceName} / Cost Per Month: {props.Sub.amount}
      </div>
    );
}
