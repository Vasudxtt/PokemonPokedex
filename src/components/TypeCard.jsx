export default function TypeCard(props)
{
  const {type} = props
  return(
    <div className="type-title">
      <p>{type}</p>
    </div>
  )
}