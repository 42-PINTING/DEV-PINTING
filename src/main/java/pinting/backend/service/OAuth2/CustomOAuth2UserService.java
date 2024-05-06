package pinting.backend.service.OAuth2;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import pinting.backend.dto.OAuth2.CustomOAuth2User;
import pinting.backend.dto.OAuth2.GoogleResponse;
import pinting.backend.dto.OAuth2.OAuth2Response;
import pinting.backend.dto.OAuth2.UserDto;
import pinting.backend.entity.OAuth2.UserEntity;
import pinting.backend.repository.OAuth2.JpaUserRepository;
import pinting.backend.repository.OAuth2.UserRepository;

@Transactional
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;

	@Autowired
	public CustomOAuth2UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(userRequest);

		//지울 주석
		System.out.println("in OAuth2User Service : " + oAuth2User);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();

		OAuth2Response oAuth2Response = null;

		if (registrationId.equals("google")) {
			oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
			System.out.println("loadUser : " + oAuth2Response);
		} else {
			//지울 주석
			System.out.println("loadUser is null");
			return null;
		}

		String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
		UserEntity existData = userRepository.findByUsername(username).orElse(null);
		System.out.println("pinting username : " + username);

		if (existData == null) {
			UserEntity userEntity = new UserEntity();
			userEntity.setUsername(username);
			userEntity.setEmail(oAuth2Response.getEmail());
			userEntity.setName(oAuth2Response.getName());
			userEntity.setRole("ROLE_USER");

			//지울 주석
			System.out.println("pinting Entity username : " + userEntity.getUsername());
			System.out.println("pinting Entity email : " + userEntity.getEmail());
			System.out.println("pinting Entity name : " + userEntity.getName());
			System.out.println("pinting Entity role : " + userEntity.getRole());

			userRepository.save(userEntity);

			//지울 주석
			System.out.println("pinting insert success");

			UserDto userDto = new UserDto();
			userDto.setUsername(username);
			userDto.setName(oAuth2Response.getName());
			userDto.setRole("ROLE_USER");

			//지울 주석
			System.out.println("pinting send ready to customOAuth2User");

			return new CustomOAuth2User(userDto);
		} else {
			existData.setEmail(oAuth2Response.getEmail());
			existData.setName(oAuth2Response.getName());

			userRepository.save(existData);

			UserDto userDto = new UserDto();
			userDto.setUsername(username);
			userDto.setName(oAuth2Response.getName());
			userDto.setRole(existData.getRole());

			return new CustomOAuth2User(userDto);
		}
	}
}