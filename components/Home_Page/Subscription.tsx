"use client"

export default function Subscription(props: any) {
    return (
      <div>
        Name: {props.Sub.Name} / Cost Per Month: {props.Sub.Cost}
      </div>
    );
}
