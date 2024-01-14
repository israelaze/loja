package br.com.loja.utils;

import java.text.ParseException;
import java.util.Collection;
import java.util.Map;

import javax.swing.text.MaskFormatter;

public class Validacoes {
	
	public static String formatarStringCpfCnpj(String texto) throws ParseException {

		if (texto != null) {

			texto = texto.replace(".", "").replace("-", "").replace("/", "");

			if (texto.trim().length() == 11) {
				MaskFormatter mf = new MaskFormatter("###.###.###-##");
				mf.setValueContainsLiteralCharacters(false);
				return mf.valueToString(texto);

			} else if (texto.trim().length() == 14) {

				MaskFormatter mf = new MaskFormatter("##.###.###/####-##");
				mf.setValueContainsLiteralCharacters(false);
				return mf.valueToString(texto);
			}
		}
		texto = "";

		return texto;
	}

	public static String removeCaracteresEspeciaisStringCpfCnpj(String texto) throws ParseException {

		// System.out.println("texto: " + texto);
		if (!isEmpty(texto)) {

			texto = texto.replace(".", "").replace("-", "").replace("/", "");
			
			return texto.trim();			
		}

		return texto;
	}

	/**
	 * @author Israel
	 * @param texto
	 * @return String com acentuação removida.
	 */
	public static String removerAcentuacao(String texto) {

		// texto = Normalizer.normalize(texto, Normalizer.DECOMP, 0);
		texto = texto.replaceAll("[^\\p{ASCII}]", "");
		return texto;
	}

	public static boolean isEmpty(String s) {

		if (s == null || s.trim().isEmpty() || s.equalsIgnoreCase("null"))
			return true;

		return false;
	}

	public static boolean isEmpty(Collection<?> list) {

		if (list == null || list.size() == 0)
			return true;

		return false;
	}

	public static boolean isEmpty(Map<?, ?> list) {

		if (list == null || list.size() == 0)
			return true;

		return false;
	}

	public static boolean isEmpty(Object[] list) {

		if (list == null || list.length == 0)
			return true;

		return false;
	}

	public static boolean isEmpty(byte[] value) {

		if (value == null || value.length == 0)
			return true;

		return false;
	}
}
