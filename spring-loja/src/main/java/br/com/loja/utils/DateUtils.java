package br.com.loja.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DateUtils {
	
	// converte uma data do tipo String numa data do tipo Date
	public static Date toDate(String date) {
		
		// caso seja vazio
		if(date == null) {
			return null;
		}
		// receber uma data no padrão YYYY-MM-DD
		int ano = Integer.parseInt(date.substring(0, 4));
		int mes = Integer.parseInt(date.substring(5, 7));
		int dia = Integer.parseInt(date.substring(8, 10)); 

		//Calendar cal = new GregorianCalendar(ano, mes - 1, dia);
		Calendar cal = new GregorianCalendar(ano, mes -1,dia);
		return cal.getTime();
	}

	// converte uma data do tipo Date numa String
	public static String toString(Date data) {
		
		// caso seja vazio
		if (data == null) {
			return null;
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(data);
	}

	// converte uma data do tipo Date numa String padrão BR
	public static String toStringPtBR(Date data) {

		// caso seja vazio
		if (data == null) {
			return null;
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		return sdf.format(data);
	}
		
	public static long calculaDiferencaEmDiasEntreDatas(Calendar dataMaior, Calendar dataMenor) {
	
		long diferenca = dataMaior.getTimeInMillis() - dataMenor.getTimeInMillis();
	
		// Quantidade de milissegundos em um dia.
		int tempoDia = 1000 * 60 * 60 * 24;
	
		long diasDiferenca = diferenca / tempoDia;
	
		return diasDiferenca;
	}
	
	public static boolean isFormatoDataBr(String data) {

		boolean isFormatoData = false;

		data = data.trim();

		Pattern pattern = Pattern.compile("^\\d{2}/\\d{2}/\\d{4}");
		Matcher verifica = pattern.matcher(data);

		if (verifica.matches()) {
			isFormatoData = true;
		} else {
			isFormatoData = false;
		}

		return isFormatoData;

	}
	
	public static boolean isFormatoDataEUA(String data) {

		boolean isFormatoData = false;

		data = data.trim();

		Pattern pattern = Pattern.compile("^\\d{4}/\\d{2}/\\d{2}");
		Matcher verifica = pattern.matcher(data);

		if (verifica.matches()) {
			isFormatoData = true;
		} else {
			isFormatoData = false;
		}

		return isFormatoData;

	}


}
