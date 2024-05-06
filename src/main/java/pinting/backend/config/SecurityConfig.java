package pinting.backend.config;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pinting.backend.OAuth2.handler.CustomSuccessHandler;
import pinting.backend.OAuth2.jwt.JWTFilter;
import pinting.backend.OAuth2.jwt.JWTUtil;
import pinting.backend.repository.JpaMemberRepository;
import pinting.backend.repository.MemberRepository;
import pinting.backend.repository.OAuth2.JpaUserRepository;
import pinting.backend.repository.OAuth2.UserRepository;
import pinting.backend.service.MemberService;
import pinting.backend.service.OAuth2.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	EntityManager em;

	private final CustomSuccessHandler customSuccessHandler;
	private final JWTUtil jwtUtil;

	@Autowired
	public SecurityConfig(EntityManager em, CustomSuccessHandler customSuccessHandler, JWTUtil jwtUtil) {
		this.em = em;
		this.customSuccessHandler = customSuccessHandler;
		this.jwtUtil = jwtUtil;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		//csrf disable
		http
				.csrf((auth) -> auth.disable());

		//From 로그인 방식 disable
		http
				.formLogin((auth) -> auth.disable());

		//HTTP Basic 인증 방식 disable
		http
				.httpBasic((auth) -> auth.disable());

		//JWTFilter 추가
		http
				.addFilterBefore(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

		//oauth2
		http
				.oauth2Login((oauth2) -> oauth2
						.userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
								.userService(customOAuth2UserService()))
						.successHandler(customSuccessHandler));

		//경로별 인가 작업
		http
				.authorizeHttpRequests((auth) -> auth
						.requestMatchers("/").permitAll()
//							.anyRequest().permitAll());
						.anyRequest().authenticated());

		//세션 설정 : STATELESS
		http
				.sessionManagement((session) -> session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}


	@Bean
	public MemberService memberService() {
		return new MemberService(memberRepository());
	}

	@Bean
	public CustomOAuth2UserService customOAuth2UserService() {
		return new CustomOAuth2UserService(userRepository());
	}

	@Bean
	public MemberRepository memberRepository() {
		return new JpaMemberRepository(em);
	}

	@Bean
	public UserRepository userRepository() {
		return new JpaUserRepository(em);
	}
}