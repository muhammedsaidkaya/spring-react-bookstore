package io.agileintelligence.projectboard.RequestBody;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.LogIdentifier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogDTO {

    private LogIdentifier logIdentifier;
    private String name;
}
