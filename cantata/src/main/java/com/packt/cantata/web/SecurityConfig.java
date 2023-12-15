package com.packt.cantata.web;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	

//	@Bean
//	@Override
//	public UserDetailsService userDetailsService() {
//		UserDetails user = User.withDefaultPasswordEncoder().username("user").password("password").roles("USER")
//				.build();
//		return new InMemoryUserDetailsManager(user);
//	}


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf().disable().cors().and()
		.authorizeHttpRequests().anyRequest().permitAll(); 
		
//		http.csrf().disable()//사이트간 위조요청(정상적인 사용자가 의도치않은 위조요청을 보내는것을 의미) 비활성화
//				.cors().and()//<-cors()함수 추가
//				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//				.authorizeRequests()// /login 엔드포인트에 대한 POST요청은 보호되지않음.
//				.antMatchers(HttpMethod.POST, "/login").permitAll()
//				.anyRequest().authenticated()// 다른 모든 요청은 보호됨
//				.and().exceptionHandling()// 예외처리를 위한 부분
//				.authenticationEntryPoint(exceptionHandler).and() // 예외처리를 위한 부분
//				.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
	}

	
	
	//보안 구성 클래스에 교차출처 리소스 공유를 위한 CORS필터 추가. 이는 다른 출처에서 요청을 보내는 프런트엔드에 필요하다.//정책규칙에 유연성을 줌
	//CORS 필터는 요청을 가로채고 해당요청이 교차출처에서 확인되면 적절한 헤더를 요청에 추가한다.
	//이를 위해 스프링시큐리티의 CorsConfigurationSource 인터페이스를 이용한다.예제에서는 모든 출처의 HTTP방식과 헤더를 허용한다.
	//허용되는 충처, 방식, 헤더 목록을 정의하면 정의를 더 세분화 할 수 있다.
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowedOrigins(Arrays.asList("*"));//출처를 명시적으로 정의하려면 아래라인과 같이 설정.
		config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); 
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(false);
		config.applyPermitDefaultValues();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

}
