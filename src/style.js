export const button1Color = '#cfd8dc'
export const button2Color = '#1e88e5'
export const button3Color = '#4caf50'
export const button4Color = '#ffff00'
export const button5Color = '#ff5252'

/*
export const button1Color = '#e6db74'
export const button2Color = '#8894A2'
export const button3Color = '#276359'
export const button4Color = '#E37239'
export const button5Color = '#E37239'
*/

export const cardBoundaryColor = imp =>{
    let value = {
        border: ("1px solid "+`${"button"+imp+"Color"}`).replace("button1Color", button1Color).replace("button2Color", button2Color).replace("button3Color", button3Color).replace("button4Color", button4Color).replace("button5Color", button5Color), 
        borderLeft: ("15px solid "+`${"button"+imp+"Color"}`).replace("button1Color", button1Color).replace("button2Color", button2Color).replace("button3Color", button3Color).replace("button4Color", button4Color).replace("button5Color", button5Color)
    }
    return (value)
}

export const avatarColor = imp =>{
    let value = {
        bgcolor: (`${"button"+imp+"Color"}`).replace("button1Color", button1Color).replace("button2Color", button2Color).replace("button3Color", button3Color).replace("button4Color", button4Color).replace("button5Color", button5Color), 
        
    }
    return (value)
}

export const inspirationalImage = {
    width: '100%',
    height:'100%'
}

export const buttonGroup = {
    width : "100%", 
    justifyContent:"center", 
    alignItems:"stretch"
}