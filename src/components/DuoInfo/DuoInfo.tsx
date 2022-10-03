interface Props {
    label: string;
    value: string;
    color?: string;
}

function DuoInfo({label, value, color}: Props) {
    return (
        <div className='w-[100%] mb-4'>
            <h1 className='mb-1'>{label}</h1>
            <p style={{color: color}} className='text-white font-bold'>
                {value}
            </p>
        </div>
    );
}

export default DuoInfo;
