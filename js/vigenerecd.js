function AsciiToA1(Char1)
{
	if (IsLower(Char1)){
	 Char1 -= 32;	
	}
	if (IsEnie(Char1)){
	return 15;
	}else if(Char1-64 < 15){
		return(Char1-64);
	}
	else if(Char1-64 >= 15 && Char1-64 < 28){
		return(Char1-63);
	}
}

function IsLetter(c){
	return IsUpper(c) || IsLower(c);
}

function IsEnie(Char2){
	if(Char2 == 209 || Char2 == 241){
		return true;
	}else{
		return false;
	}

}

function IsUpper(Char3){
	if((Char3 >= 65 && Char3 <= 90) || (Char3 == 209)){
		return true;
	}else{
		return false;
	}
}

function IsLower(Char4){
	if((Char4 >= 97 && Char4 <= 122) || (Char4 == 241)){
		return true;
	}else{
		return false;
	}
}

function IsA1Char(Char5){
	if (Char5 > 27){
		return false;
	}else{
		return true;
	}
}
function Encriptar(ModeEnc)
{
	var GetPhrase = document.getElementById('InputText').value;
	var GetPass = document.getElementById('PassWord').value;
	var Codes = [];
	if(GetPhrase.length < 1 || GetPass.length < 1)
	{
		alert('La frase/contraseña no puede estar en blanco')
		return;
	}
	var PassData = PhraseToArray(GetPass);
	var PhraseData = PhraseToArray(GetPhrase);
	var SpaceCount = 0;
	if (ModeEnc == true){
		for(var i = 0; i < PhraseData.length; i++){
			if(IsA1Char(PhraseData[i]) == false){
				Codes.push(PhraseData[i]);
				SpaceCount += 0;
			}else if(IsA1Char(PhraseData[i]) == true){
				Codes.push((PassData[(i - SpaceCount) % PassData.length] + PhraseData[i]) % 27);
			}
		}
	}else{
		for(var i = 0; i < PhraseData.length; i++)	{
			if(IsA1Char(PhraseData[i]) == false){
				Codes.push(PhraseData[i]);
				SpaceCount += 1;
			}else{
				var Value = PhraseData[i] - PassData[(i - SpaceCount) % PassData.length];
				if (Value < 1){
					Value += 27;
				}
			Codes.push(Value % 27);
			}
		}
	}
	document.getElementById('Result').value = Codes;
	return Codes;
}
function RebuildString(Codigos)
{
	var Salida = ""
	for(var i = 0; i < Codigos.length; i++)
	{
		if (IsA1Char(Codigos[i]) == false){
			Salida += String.fromCharCode(Codigos[i]);
		}else{
			if (Codigos[i] == 15 )
				Salida += String.fromCharCode(209);
			if (Codigos[i] == 0)
				Salida += String.fromCharCode(90);
			if(Codigos[i] < 15 && Codigos [i] > 0)
				Salida += String.fromCharCode(Codigos[i]+64);
			if(Codigos[i] > 15 && Codigos[i] < 28)
				Salida += String.fromCharCode(Codigos[i]+63);
		}
	}
	document.getElementById('Result').value = Salida;
}

function PhraseToArray(Text){
	var Out = [];
	for(var i = 0; i < Text.length; i++){
		var CodeChar = Text.charCodeAt(i);
		if(IsLetter(CodeChar) == true){
			Out.push(AsciiToA1(CodeChar));
		}else{
			Out.push(CodeChar);
		}
	}
	return Out;
}