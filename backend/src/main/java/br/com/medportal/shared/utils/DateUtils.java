package br.com.medportal.shared.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DateUtils {
	
	private static final Logger logger = LoggerFactory.getLogger(DateUtils.class);
	
	public static Date parseStringToDate(String s) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("YYYY-mm-dd");
			
			return sdf.parse(s);
		} catch (ParseException e) {
			logger.error("Error parsing string: {}", s);
		}
		
		return null;
	}

}
