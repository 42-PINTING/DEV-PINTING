package pinting.backend;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pinting.backend.repository.JpaMemberRepository;
import pinting.backend.repository.MemberRepository;
import pinting.backend.service.MemberService;

import javax.sql.DataSource;

@Configuration
public class SpringConfig {

	EntityManager em;

	@Autowired
	public SpringConfig(EntityManager em) {
		this.em = em;
	}

	@Bean
	public MemberService memberService() {
		return new MemberService(memberRepository());
	}

	@Bean
	public MemberRepository memberRepository() {
		return new JpaMemberRepository(em);
	}
}
