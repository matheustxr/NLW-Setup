interface ProgressBarProps {
    progress:number
}

export function ProgressBar(props:ProgressBarProps) {
    return(
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4  ">
           <div 
                role="progressbar"
                aria-label="Progresso de hábito completados nesse dia"
                aria-valuenow={props.progress}
                className="h-3 rounded-xl bg-violet-600 transition-all"
                style={ {
                    width: `${props.progress}%`
                    }
                 }
            />   
       </div>
        
    )
}