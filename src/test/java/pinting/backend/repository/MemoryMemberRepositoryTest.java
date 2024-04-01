package pinting.backend.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import pinting.backend.domain.Member;

class MemoryMemberRepositoryTest {

	MemoryMemberRepository store = new MemoryMemberRepository();

	@AfterEach
	public void afterEach() {
		store.clear();
	}

	@Test
	public void save() {
		Member member = new Member();
		member.setName("spring");
		store.save(member);

		Member result = store.findById(member.getId()).get();
		Assertions.assertThat(member).isEqualTo(result);
	}

	@Test
	public void findByName() {
		Member member1 = new Member();
		member1.setName("spring1");
		store.save(member1);

		Member member2 = new Member();
		member2.setName("spring2");
		store.save(member2);

		Member result = store.findByName("spring1").get();
		Assertions.assertThat(member1).isEqualTo(result);
	}

	public void clearStore() {
		store.clear();
	}
}
