package br.com.medportal.config.message;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@Configuration
public class MessageConfiguration {
	
	@Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver localResolver = new SessionLocaleResolver();
        localResolver.setDefaultLocale(new Locale("pt", "BR"));
        return localResolver;
    }

    @Bean(name = "messageConfig")
    public MessageSource messageResource() {
        ResourceBundleMessageSource messageBundleResrc = new ResourceBundleMessageSource();
        messageBundleResrc.setBasename("messages");
        messageBundleResrc.setDefaultEncoding("UTF-8");
        return messageBundleResrc;
    }

}
