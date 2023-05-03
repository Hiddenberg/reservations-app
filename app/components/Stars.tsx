function Stars({starsCount}: {starsCount: number}) {
   let starsString = ""
   for (let i=0; i < starsCount; i++) {
      starsString += "★"
   }

   return (<div className="flex mb-2">{starsString}</div>)
}

export default Stars