<!--*******************   BLACKOUTS   ***************************  -->

	<div class="loginBlackout blackout">
		<div class="loginBox">
			<form id="loginForm">
				<input id="loginEmail" type="text" maxlength="50" size="30" placeholder="EMAIL" name="email" required>
				<div class="passwordBox">
					<input id="loginPass" type="password" maxlength="30" size="30" placeholder="PASSWORD" name="password" required>
					<div class="loginForget">Forgot your password?</div>
				</div><!--END OF passwordBox DIV-->
				<div class="signError loginError"></div>
				<div id="loginSubmit">Log In</div>
			</form>
		</div>
	</div>

	<div class="optionBlackout blackout">
		<div class="optionBox">
			<div class="optionButton signUpButton">Sign Up</div>
			<div class="optionButton logInButton">Log In</div>
			<div class="optionButton logOutButton">Log Out</div>
		</div><!--END OF optionBox DIV-->
	</div><!--END OF optionBlackout DIV-->

	<div class="respondBlackout blackout">
		<div class="respondTopicBox">
			<div class="respondTopic"></div>
		</div>
		<div class="respondBox">
			<span></span>
			<div class="agreeButton respondInButton"><div class="viewNum viewNumA">8</div><div class="threeButtonText">AGREEMENT</div></div>
			<div class="neutralButton respondInButton"><div class="viewNum viewNumN">8</div><div class="threeButtonText">NEUTRALITY</div></div>
			<div class="disagreeButton respondInButton"><div class="viewNum viewNumD">8</div><div class="threeButtonText">DISAGREEMENT</div></div>
		</div><!--END OF respondBox DIV-->
	</div><!--END OF respondBlackout DIV-->

	<div class="viewTopicBlackout blackout">
		<div class="viewTopicBox blankView">
			<div class="viewTopic"><?php

		 ///////////////////////////////////////////   RESPOND PAGE   /////////////////////////////////////


			if (strpos($_SERVER['REQUEST_URI'], 'respond')){

				if ($_GET['rT'] == "mT"){
					echo ($db->query("SELECT TOPIC FROM main_topic WHERE QUEUE_NUM='0'")->fetch_row()[0]);
				} elseif ($_GET['rT'] == "P"){
					$respondViewPost = $db->query("SELECT CONTENT FROM statement WHERE statement.POST_ID='".$_GET['id']."'");
					for ($i=0; $i < $respondViewPost->num_rows ; $i++) { 
						echo "<p>".$respondViewPost->fetch_row()[0]."</p>";
					}
				} elseif ($_GET['rT'] == "S"){
					echo ($db->query("SELECT CONTENT FROM statement WHERE statement.ID='".$_GET['id']."'")->fetch_row()[0]);
				}
			}
			?></div>
			<div class="reviewContent"></div>
			
			<div class="submitPost">Submit Post</div>
		</div><!--END OF viewTopicBox DIV-->
	</div><!--END OF viewTopicBlackout DIV-->

	<!-- <div class="rateBlackout blackout">
		<div class="rateContent">There is no way I'd ever get to 350 characters with one simple statement. Even if I tried to make multiple points, referencing multiple places with all kinds of varying information. The possibility of 350 characters is actually quite vast when you consider the total ability that you have with the limit. For example, there are 350 characters here...</div>
		<div class="rateRatingBox">
			<div class="rateRatingGreen rateRatingButton">Well Spoken</div>
			<div class="rateRatingBlue rateRatingButton">Not Helpful</div>
			<div class="rateRatingRed rateRatingButton">Rude/Insulting</div>
		</div>
	</div> -->

	<div class="layerBlackout blackout">
		<div class="layerBox">
			<div class="layerContent"></div>
			<div class="layerNavBox">
				<div class="layerNavPrev layerNavButton"><span>&#x25B2;</span></div>
				<div class="layerNavGo layerNavButton">Go To Layer</div>
				<div class="layerNavNext layerNavButton"><span>&#x25B2;</span></div>
			</div>
		</div>
	</div>

	<div class="signUpBlackout blackout">
		<form class="signUpForm" name="signUp">

			<input required id="signEmail" type="email" maxlength="50" name="email" placeholder="EMAIL" value="<?php stickyText('email') ?>" />
			<?php /*<input required type="tel" maxlength="12" name="phone" placeholder="PHONE NUMBER" /> */ ?>
			<input required id="signPass" type="password" maxlength="30" name="password" placeholder="PASSWORD" />
			<input required id="signPassVerify" type="password" maxlength="30" name="verifyPassword" placeholder="VERIFY PASSWORD" />
			<?php /*
			<h2>Demographic Info</h2>
			<span>Zipcode</span>
			<input required type="text" maxlength="11" name="zipcode" placeholder="ZIPCODE" />
			<span>Birthdate</span>
			<input required type="date" name="birthdate" />
			<span>Education Level</span>
			<select required name="education">
				<option value="">-SELECT-</option>
				<?php 
					$result = $db->query("SELECT LEVEL FROM education_level");
					for ($i=0; $i < $result->num_rows; $i++) { 
						echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
					}
				?>
			</select>
			<span>Ethnicity</span>
			<select required name="ethnicity">
				<option value="">-SELECT-</option>
				<?php 
					$result = $db->query("SELECT ETHNICITY_TYPE FROM ethnicity");
					for ($i=0; $i < $result->num_rows; $i++) { 
						echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
					}
				?>
			</select>
			<span>Gender</span>
			<select required name="gender">
				<option value="">-SELECT-</option>
				<?php 
					$result = $db->query("SELECT GENDER_TYPE FROM gender");
					for ($i=0; $i < $result->num_rows; $i++) { 
						echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
					}
				?>
			</select>
			<span>Annual Income Level</span>
			<select required name="income">
				<option value="">-SELECT-</option>
				<?php 
					$result = $db->query("SELECT LEVEL FROM income_level");
					for ($i=0; $i < $result->num_rows; $i++) { 
						echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
					}
				?>
			</select>
			<span>Religion</span>
			<select required name="religion">
				<option value="">-SELECT-</option>
				<?php 
					$result = $db->query("SELECT DENOMINATION FROM religion");
					for ($i=0; $i < $result->num_rows; $i++) { 
						echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
					}
				?>
			</select>
			*/ ?>
			<!-- <button class="logInButton signUpSubmit">Log In</button> -->
			<div class="signError signErrorEmail"></div>
			<div class="signError signErrorPass"></div>
			<div class="signUpSubmit">Sign Up</div>
		</form>
	</div>

<!-- ************************   end of BLACKOUTS   *************************** -->

<script src="js/script.js"></script>